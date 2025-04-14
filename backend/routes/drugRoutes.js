const express = require("express");
const { getAllDrugs, addDrug } = require("../controllers/drugcontroller");
const authenticate = require("../middleware/firebaseAuth");
const router = express.Router();

router.get("/", getAllDrugs);

router.post("/add", authenticate, addDrug);

module.exports = router;

