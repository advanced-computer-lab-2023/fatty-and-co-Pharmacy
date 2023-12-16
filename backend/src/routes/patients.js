const express = require("express");
const {
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  getEmergencyContact,
  getWalletAmount,
  getMedicineDiscount,
  viewSubscribedPackage,
} = require("../controllers/patientController");

const router = express.Router();

// TODO: add type check as middleware if needed
router.get("/getAllPatients", getAllPatients);

// TODO: add type check as middleware if needed
router.delete("/deletePatient/:id", deletePatient);

// TODO: add type check as middleware if needed
router.get("/getPatient/:id", getPatient);

// TODO: add type check as middleware if needed
router.patch("/updatePatient/:id", updatePatient);

// TODO: add type check as middleware if needed
router.get("/getPatientUsername/:Username", getPatientUsername);

// TODO: add type check as middleware if needed
router.get("/getEmergencyContact/:Username", getEmergencyContact);
router.get("/getWalletAmount", getWalletAmount);

router.get("/getMedicineDiscount", getMedicineDiscount);

router.get("/viewSubscription",viewSubscribedPackage);

module.exports = router;
