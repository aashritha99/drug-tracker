const Drug = require("../models/Drug");

// Add a new drug
const addDrug = async (req, res) => {
  console.log("🔥 [addDrug] Endpoint called");
  console.log("📦 Request Body:", req.body);
  console.log("🔐 Authenticated User ID:", req.user?.uid); // from Firebase middleware

  try {
    const { name, manufacturer, expiryDate, batchNumber } = req.body;

    // Validate required fields
    if (!name || !manufacturer || !expiryDate || !batchNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDrug = new Drug({
      name,
      manufacturer,
      expiryDate,
      batchNumber,
      userId: req.user.uid, // Use Firebase UID
    });

    await newDrug.save();

    console.log("✅ Drug saved:", newDrug);
    res.status(201).json({ message: "Drug added successfully", drug: newDrug });
  } catch (err) {
    console.error("❌ Error saving drug:", err.message);
    res.status(500).json({ message: "Failed to add drug", error: err.message });
  }
};

// Get all drugs
const getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.status(200).json(drugs);
  } catch (err) {
    console.error("❌ Error fetching drugs:", err.message);
    res.status(500).json({ message: "Failed to fetch drugs" });
  }
};

// Get drug by ID
const getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    res.status(200).json(drug);
  } catch (err) {
    console.error("❌ Error fetching drug by ID:", err.message);
    res.status(500).json({ message: "Failed to fetch drug" });
  }
};

module.exports = {
  addDrug,
  getAllDrugs,
  getDrugById,
};
