const express = require("express");
const {
    viewCart,
    deleteItem,
    addMedicineToCart,
    decrementItemCount
} = require("../controllers/cartController");

const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

// Add Medicine to cart as a patient.
router.post("/addToCart", checkPatient, addMedicineToCart);

// // Increment count of medicine in cart.
// router.post("/incrementItem", checkPatient, incrementItemCount);

// Decrement count of medicine in cart
router.post("/decrementItem", checkPatient, decrementItemCount);

router.get("/viewCart", checkPatient, viewCart);
router.post("/deleteItem", checkPatient, deleteItem);


module.exports = router;