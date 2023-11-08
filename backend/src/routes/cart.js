const express = require("express");
const {
    addMedicineToCart,
} = require("../controllers/cartController");

const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

// Add Medicine to cart as a patient.
router.post("/addToCart/:id", checkPatient, addMedicineToCart);

module.exports = router;