const express = require("express");
const {} = require("../controllers/orderController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("orders");
});

module.exports = router;
