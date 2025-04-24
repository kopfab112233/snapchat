app.post('/submit', (req, res) => {
  console.log("🔔 Formular abgeschickt");

  // Logge alle Felder zur Kontrolle
  console.log("Formulardaten:", req.body);

  const { email, username } = req.body;

  console.log("📧 E-Mail erhalten:", email);
  console.log("👤 Benutzername erhalten:", username);

  res.redirect('/danke.html');
});
