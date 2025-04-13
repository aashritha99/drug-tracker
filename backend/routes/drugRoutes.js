const express = require("express");
const router = express.Router();
const Drug = require("../models/Drug");
const QRCode = require("qrcode");

const addDrug = async (req, res) => {
  try {
    const { name, batchNumber, manufactureDate, expiryDate, currentLocation } = req.body;
    const userId = req.user.uid;

    const newDrug = new Drug({
      name,
      batchNumber,
      manufactureDate,
      expiryDate,
      currentLocation,
      userId,
      history: [{ location: currentLocation, timestamp: new Date() }],
    });

    const savedDrug = await newDrug.save();

    const qrData = `http://localhost:3000/track/${savedDrug._id}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    savedDrug.qrCodeUrl = qrCodeUrl;
    await savedDrug.save();

    res.status(201).json({ message: "Drug added with QR code", drug: savedDrug });
  } catch (error) {
    console.error("❌ Error adding drug:", error);
    res.status(500).json({ message: "Failed to add drug" });
  }
};

const getAllDrugs = async (req, res) => {
  try {
    const drugs = await Drug.find({ userId: req.user.uid });
    res.status(200).json(drugs);
  } catch (error) {
    console.error("❌ Error fetching drugs:", error);
    res.status(500).json({ message: "Failed to fetch drugs" });
  }
};

const getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findOne({ _id: req.params.id, userId: req.user.uid });
    if (!drug) return res.status(404).json({ message: "Drug not found" });
    res.status(200).json(drug);
  } catch (error) {
    console.error("❌ Error fetching drug by ID:", error);
    res.status(500).json({ message: "Failed to fetch drug" });
  }
};

module.exports = {
  addDrug,
  getAllDrugs,
  getDrugById,
};
