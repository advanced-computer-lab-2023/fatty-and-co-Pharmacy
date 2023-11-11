const express = require("express");
const { checkout } = require("../controllers/orderController");
const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("orders");
});

router.post("/checkout", checkPatient, checkout);

router.get("/getOrders", checkPatient, getOrders);

router.get("/getOrderDetailsandStatus", checkPatient, getOrderDetailsandStatus);

router.post("/cancelOrder", checkPatient, cancelOrder);

module.exports = router;
