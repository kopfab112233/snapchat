const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST-Route
app.post('/submit', (req, res) => {
  const { email } = req.body;
  console.log("E-Mail erhalten:", email);

  // Optional: in Datei/Datenbank speichern oder Mail versenden
  // z.B. mit nodemailer oder fs.writeFile()

  // Weiterleiten
  res.redirect('https://kopfab112233.github.io/pages/danke.html');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
