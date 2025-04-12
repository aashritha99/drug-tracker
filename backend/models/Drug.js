const mongoose = require("mongoose");



const drugSchema = new mongoose.Schema({
  name: { type: String },
  batchNumber: { type: String },
  manufactureDate: { type: Date },
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
