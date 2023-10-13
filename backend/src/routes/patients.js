const express = require("express");
const {
  createPatient,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  getEmergencyContact
} = require("../controllers/patientController");

const router = express.Router();

router.post("/addPatient", createPatient);

router.get("/getAllPatients", getAllPatients);

router.delete("/deletePatient/:id", deletePatient);

router.get("/getPatient/:id", getPatient);

router.patch("/updatePatient/:id", updatePatient);

router.get("/getPatientUsername/:Username", getPatientUsername);

router.get("/getEmergencyContact/:Username", getEmergencyContact);

module.exports = router;
