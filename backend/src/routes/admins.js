const express = require("express");
const {
  viewPharmacist,
  viewPatient,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.get("/viewPharmacist/:username", viewPharmacist);

router.get("/viewPatient/:username", viewPatient);

module.exports = router;
