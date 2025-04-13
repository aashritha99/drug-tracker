const express = require("express");
const drugrouter = express.Router();
const {
  addDrug,
  getAllDrugs,
  getDrugById
} = require("../controllers/drugcontroller");

const authenticate = require("../middleware/firebaseAuth");
// ✅ Custom test route — MUST come before /:id
drugrouter.get("/test", (req, res) => {
  res.send("✅ Drug API is reachable");
});

// ✅ Main drug routes
drugrouter.post("/",authenticate, addDrug);
drugrouter.get("/",authenticate, getAllDrugs);

// ✅ Dynamic route LAST
drugrouter.get("/:id",authenticate, getDrugById);

module.exports = drugrouter;


