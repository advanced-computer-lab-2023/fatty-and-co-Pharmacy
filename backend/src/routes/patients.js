const express = require("express");
const {
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  getEmergencyContact,
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

module.exports = router;
