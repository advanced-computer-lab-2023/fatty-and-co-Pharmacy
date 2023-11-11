const express = require("express");
const {
    viewDeliveryAddresses,
    addDeliveryAddress
} = require("../controllers/deliveryAddressController");

const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

// View all available delivery addresses.
router.get("/viewDeliveryAddresses", checkPatient, viewDeliveryAddresses);

// Add new delivery address
router.post("/addDeliveryAddress", checkPatient, addDeliveryAddress);

module.exports = router;