const express = require("express");
const {} = require("../controllers/pharmacistController");

const router = express.Router();

router.post("/addPharmacist", createPharmacist);

router.get("/getAllPharmacists", getAllPharmacists);

router.delete("/deletePharmacist/:id", deletePharmacist);

router.get("/getPharmacist/:id", getPharmacist);

router.get("/", (req, res) => {
  res.send("pharmacists");
});

module.exports = router;
