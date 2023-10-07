const express = require("express");
const {
  viewPharmacist,
  viewPatient,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.get("/viewPharmacist/:id", viewPharmacist);

router.get("/viewPatient/:id", viewPatient);

module.exports = router;
