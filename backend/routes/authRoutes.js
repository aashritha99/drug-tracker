const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { firebaseLogin } = require("../controllers/authController");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.json({
    message: "WOrking..",
  });
});

router.post("/firebase-login", firebaseLogin);
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const found = await User.findOne({ email });

  if (found) {
    return res.status(200).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    message: "User created successfully",
    user: {
      name,
      email,
    },
  });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  res.status(201).json({
    token,
    message: "Sign Up successful",
  });
});

module.exports = router;
