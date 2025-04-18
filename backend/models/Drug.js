const mongoose = require("mongoose");



const drugSchema = new mongoose.Schema({
  name: { type: String },
  userId: { type: String, required: true },
  batchNumber: { type: String },
  manufacturer: { type: String },
  expiryDate: { type: Date },
  currentLocation: { type: String },
  history: [
    {
      location: String,
      timestamp: Date,
    },
  ],
  qrCodeUrl: { type: String },
});

module.exports = mongoose.model("Drug", drugSchema);
