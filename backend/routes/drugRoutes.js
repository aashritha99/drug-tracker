const express = require("express");
const drugrouter = express.Router();
const {
  addDrug,
  getAllDrugs,
  getDrugById
} = require("../controllers/drugcontroller");

// ✅ Custom test route — MUST come before /:id
drugrouter.get("/test", (req, res) => {
  res.send("✅ Drug API is reachable");
});

// ✅ Main drug routes
drugrouter.post("/", addDrug);
drugrouter.get("/", getAllDrugs);

// ✅ Dynamic route LAST
drugrouter.get("/:id", getDrugById);

module.exports = drugrouter;


