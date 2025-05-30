const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

app.post('/send-email', async (req, res) => {
  const { email,subject, message, html  } = req.body;

  try {
    await transporter.sendMail({
      from: '"No Reply" <noreply@example.com>',
      to: email,
      subject: subject || 'Default Subject',
      text: message || 'Default plain text message',
      html: html || undefined, // HTML body (optional)
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
