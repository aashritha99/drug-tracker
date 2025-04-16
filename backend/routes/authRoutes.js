const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { firebaseLogin } = require("../controllers/authController");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({ message: "Working.." });
});

// 🔐 Firebase Login (already updated)
router.post("/firebase-login", firebaseLogin);

// 🔹 Regular Signup With Role
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!role || !["manufacturer", "user"].includes(role)) {
    return res.status(400).json({ message: "Invalid or missing role." });
  }

  const found = await User.findOne({ email });
  if (found) {
    return res.status(200).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  res.json({
    message: "User created successfully",
    user: { name, email, role },
  });
});

// 🔹 Regular Login + Include Role in JWT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

  res.status(200).json({
    token,
    message: "Login successful",
    user: { name: user.name, email: user.email, role: user.role },
  });
});

// 🔸 Get User Role – Optional Utility
router.get("/getUserRole", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ role: user.role });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
