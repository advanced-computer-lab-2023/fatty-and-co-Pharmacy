const express = require("express");
const {
  createSystemUser,
  createPharmacist,
  createPatient,
  getSystemUsers,
  getAdmins,
  getPharmacists,
  getPatients,
} = require("../controllers/testController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tests");
});

router.get("/Users", (req, res) => {
  getSystemUsers(req, res);
});

router.get("/Admins", (req, res) => {
  getAdmins(req, res);
});

router.get("/Pharmacists", (req, res) => {
  getPharmacists(req, res);
});

router.get("/Patients", (req, res) => {
  getPatients(req, res);
});

router.post("/createUser", (req, res) => {
  createSystemUser(req, res);
});

router.post("/createPharmacist", (req, res) => {
  createPharmacist(req, res);
});

router.post("/createPatient", (req, res) => {
  createPatient(req, res);
});

module.exports = router;
