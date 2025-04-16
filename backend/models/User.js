const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Only for local/email signup
    role: {
      type: String,
      enum: ['manufacturer', 'user'],
      required: true,
    },
    photo: { type: String },
    provider: {
      type: String,
      enum: ["google", "local"],
      required: true,
      default: "local",
    },
    googleId: { type: String }, // Firebase UID or Google sub (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
