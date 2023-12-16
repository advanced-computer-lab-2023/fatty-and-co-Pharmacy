const express = require("express");
const {
  createPharmacist,
  getAllPharmacists,
  getPharmacist,
  deletePharmacist,
  getAllPatients,
  getPharmacistUsernameSocket,
} = require("../controllers/pharmacistController");

const {
  checkPharmacist,
  checkAdmin,
} = require("../common/middleware/checkType");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("pharmacists");
});

router.post("/addPharmacist", checkAdmin, createPharmacist);

router.get("/getAllPharmacists", checkAdmin, getAllPharmacists);

// TODO: add type check as middleware if needed
router.delete("/deletePharmacist/:id", deletePharmacist);

// TODO: add type check as middleware if needed
router.get("/getPharmacist/:id", getPharmacist);

router.get("/getAllPatients",checkPharmacist, getAllPatients);

router.get("/getPharmacistUsernameSocket", checkPharmacist, getPharmacistUsernameSocket);

module.exports = router;
