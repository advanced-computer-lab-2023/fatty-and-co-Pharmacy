const express = require("express");
const {
    addMedicineToCart, incrementItemCount, decrementItemCount,
} = require("../controllers/cartController");

const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

// Add Medicine to cart as a patient.
router.post("/addToCart", checkPatient, addMedicineToCart);

// Increment count of medicine in cart.
router.post("/incrementItem", checkPatient, incrementItemCount);

// Decrement count of medicine in cart
router.post("/decrementItem", checkPatient, decrementItemCount);

module.exports = router;