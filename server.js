const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bnmmessaging@gmail.com', // your gmail
    pass: 'nlsfuifrnljvwmho', // app password
  },
});
console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS,"hardcoded value are bnmmessaging@gmail.com and nlsfuifrnljvwmho")
app.post('/send-email', async (req, res) => {
  const { email, subject, message, html } = req.body;

  console.log("📩 Incoming request to /send-email");
  console.log("Request body:", req.body);

  // Step 1: Basic validation
  if (!email) {
    console.warn("⚠️ No recipient email provided.");
    return res.status(400).json({ success: false, error: "Recipient email is required." });
  }

  // Step 2: Mail options
  const mailOptions = {
    from: '"No Reply" <noreply@example.com>',
    to: email,
    subject: subject || 'Default Subject',
    text: message || 'Default plain text message',
    html: html || undefined,
  };

  console.log("📦 Mail options prepared:", mailOptions);

  try {
    // Step 3: Sending email
    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    console.log("📬 Mailer response:", response);

    res.json({ success: true, info: response });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
