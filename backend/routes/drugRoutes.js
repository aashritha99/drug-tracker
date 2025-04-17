const express = require("express");
const router = express.Router();

// Controllers
const { getAllDrugs, addDrug } = require("../controllers/drugcontroller");

// Firebase Auth Middleware
const authenticate = require("../middleware/firebaseAuth");

// @route   GET /api/drugs/
// @desc    Get all drugs (optional: make public or protect with auth)
router.get("/", getAllDrugs);

// @route   POST /api/drugs/add
// @desc    Add a new drug (protected route)
router.post("/add", authenticate, addDrug);

module.exports = router;
