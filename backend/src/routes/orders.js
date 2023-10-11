const express = require("express");
const {} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);

module.exports = router;
