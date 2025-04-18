// controllers/contactController.js

const Contact = require("../models/Contact");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    console.log("📨 Received Contact:", req.body);

    res.status(201).json({ message: "Message received!" });
  } catch (err) {
    console.error("❌ Error saving contact message:", err.message);
    res.status(500).json({ error: "Failed to submit contact form." });
  }
};

module.exports = { submitContactForm };
