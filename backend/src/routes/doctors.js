const express = require("express");
const { getAllDoctors } = require("../controllers/doctorController");

// Create the router
const router = express.Router();

router.get("/getAllDoctors", getAllDoctors);

module.exports = router;
