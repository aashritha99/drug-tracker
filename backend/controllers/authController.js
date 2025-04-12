const admin = require("../firebase"); // 👈 from firebase.js
const User = require("../models/User"); // your Mongoose model
const jwt = require("jsonwebtoken");

const firebaseLogin = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    const { uid, email, name } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ email });
     console.log("yes")
    if (!user) {
      user = await User.create({
        email,
        name,
        provider: "google", // add this line to track source
        googleId: uid, // optional, store UID if needed
        photo: decodedToken.picture || null,
      });
    }
      console.log(user);
    // Generate your own JWT
    const ourToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token: ourToken, user });
  } catch (error) {
    console.error("❌ Firebase login error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { firebaseLogin };


