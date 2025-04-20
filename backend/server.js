const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const drugRoutes = require("./drugRoutes.js");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ to parse incoming JSON
app.use("/api/drugs", drugRoutes);
app.use("/api/drugs", require("./drugRoutes"));
app.use("/api/auth", authRoutes);
app.use("/api/Contacts", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 DrugTrack API is working");
});

// Mount routes

app.use((req, res, next) => {
  console.log("🚨 Incoming request:", req.method, req.url);
  next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
