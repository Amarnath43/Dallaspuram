// api/send.js
const { Resend } = require("resend");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { name, email, phone, subject, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { id } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "amaryt6m@gmail.com", // where you want to receive messages
      subject: subject || "New Contact Form Message",
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
};
