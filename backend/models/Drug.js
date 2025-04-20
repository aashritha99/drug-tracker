const mongoose = require("mongoose");



const drugSchema = new mongoose.Schema({
  name: { type: String },
  userId: { type: String, required: true },
  batchNumber: { type: String },
  manufacturer: { type: String },
  expiryDate: { type: Date },
  currentLocation: { type: String , default: null },
  history: [
    {
      location: String,
      timestamp: Date,
    },
  ],
  qrCodeUrl: { type: String, default: null },
});

module.exports = mongoose.model("Drug", drugSchema);
