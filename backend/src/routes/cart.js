const express = require("express");
const {
    viewCart,
    deleteItem
} = require("../controllers/cartController");

const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

// Add Medicine to cart as a patient.
// router.post("/addToCart/:id", checkPatient, addMedicineToCart);
router.get("/viewCart", checkPatient, viewCart);
router.post("/deleteItem", checkPatient, deleteItem);


module.exports = router;