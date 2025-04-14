const Drug = require("../models/Drug");

const addDrug = async (req, res) => {
  console.log("🔥 addDrug endpoint called");
  console.log("📦 Request body:", req.body);
  console.log("🔐 Authenticated user:", req.user._id); // from middleware

  try {
    const newDrug = new Drug({
      ...req.body,
      userId: req.user._id  // ✅ Set the drug's owner as the logged-in user
    });

    await newDrug.save();
    res.status(201).json(newDrug);
  } catch (err) {
    console.error("❌ Error saving drug:", err.message);
    res.status(500).json({ error: err.message });
  }
};


const getAllDrugs = async (req, res) => {
  const drugs = await Drug.find();
  res.json(drugs);
};

const getDrugById = async (req, res) => {
  const drug = await Drug.findById(req.params.id);
  if (drug) res.json(drug);
  else res.status(404).json({ message: "Drug not found" });
};


module.exports = {
  addDrug,
  getAllDrugs,
  getDrugById
};

