const admin = require("../firebase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const firebaseLogin = async (req, res) => {
  const { token, role } = req.body; // 🔹 role comes from frontend
  console.log(token);

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    const { uid, email, name } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ email });
    console.log("yes");

    if (!user) {
      user = await User.create({
        email,
        name,
        provider: "google",
        googleId: uid,
        photo: decodedToken.picture || null,
        role, // 🔹 Save the selected role
      });
    }

    console.log(user);

    // Generate your own JWT
    const ourToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token: ourToken, user });
  } catch (error) {
    console.error("❌ Firebase login error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { firebaseLogin };