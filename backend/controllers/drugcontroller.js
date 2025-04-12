const Drug = require("../models/Drug");

const addDrug = async (req, res) => {
  console.log("🔥 addDrug endpoint called"); // ← should always print
  console.log("📦 Request body:", req.body); // ← this should print the body

  try {
    const newDrug = new Drug(req.body);
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

