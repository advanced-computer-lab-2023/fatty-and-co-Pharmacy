const express = require("express");
const { createRequest, updateRequest } = require("../controllers/guestController");

const router = express.Router();

router.post("/addRequest", createRequest);
// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.put("/updateRequest/:id", updateRequest);

module.exports = router;
