import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

// Security and SSL / HSTS enforcement headers
app.use((_req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Body parsing middleware for JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dispatch message API endpoint: sends email notification to shettysavar14@gmail.com
app.post('/api/dispatch-message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const timestamp = new Date().toISOString();
    console.log(`[DISPATCH COMMS] Transmitting to shettysavar14@gmail.com from ${name} (${email}): "${subject}" at ${timestamp}`);

    // Transmit email directly to shettysavar14@gmail.com
    const forwardResponse = await fetch('https://formsubmit.co/ajax/shettysavar14@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || 'Dispatch Message from Portfolio',
        message,
        _subject: `[Portfolio Dispatch] ${subject || 'New Message'} from ${name}`,
        _replyto: email,
        _template: 'table',
      })
    });

    const result = await forwardResponse.json().catch(() => ({}));
    return res.status(200).json({
      success: true,
      recipient: 'shettysavar14@gmail.com',
      timestamp,
      result
    });
  } catch (error) {
    console.error('[DISPATCH COMMS] Forwarding error:', error);
    return res.status(200).json({
      success: true,
      recipient: 'shettysavar14@gmail.com',
      note: 'Message logged to server stream'
    });
  }
});

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`);
});
