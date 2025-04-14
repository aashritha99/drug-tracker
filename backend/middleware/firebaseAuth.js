const admin = require("firebase-admin");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  console.log(token);

  try {
    // Step 1: Try verifying with Firebase
    const decodedFirebase = await admin.auth().verifyIdToken(token);
    console.log("✅ Firebase token verified");

    let user = await User.findById(decodedFirebase.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found (Google auth)" });
    }

    req.user = user;
    req.authProvider = "firebase";
    return next();
  } catch (firebaseErr) {
    console.log("⚠️ Not a Firebase token, trying JWT...");
  }

  try {
    // Step 2: Try verifying with your JWT
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ JWT token verified");
    const user = await User.findById(decodedJWT.userId);


    if (!user) {
      return res.status(404).json({ message: "User not found (JWT auth)" });
    }

    req.user = user;
    req.authProvider = "jwt";
    return next();
  } catch (jwtErr) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
