const express = require("express");
const {
  createRequest,
  updateRequest,
  createPatient,
  login,
} = require("../controllers/guestController");
const requireAuth = require("../common/middleware/requireAuth");

const router = express.Router();

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.post("/login", login);

/**
 * @route POST /patients/addPatient
 * @desc patient signup
 * @access Public
 * @prop {string} Username - The username of the patient
 * @prop {string} Name - The name of the patient
 * @prop {string} Password - The password of the patient
 * @prop {string} Email - The email of the patient
 * @prop {string} MobileNum - The mobile number of the patient
 * @prop {string} DateOfBirth - The date of birth of the patient
 * @prop {string} Gender - The gender of the patient ["M", "F"]
 * @prop {string} EmergencyContactNumber - The emergency contact number of the patient
 * @prop {string} EmergencyContactName - The emergency contact name of the patient
 */
router.post("/addPatient", createPatient);

/**
 * @route POST /guests/addRequest
 * @desc pharmacist signup request
 * @access Public
 * @prop {string} Username - The username of the pharmacist
 * @prop {string} Password - The password of the pharmacist
 * @prop {string} Email - The email of the pharmacist
 * @prop {string} Name - The name of the pharmacist
 * @prop {string} DateOfBirth - The date of birth of the pharmacist
 * @prop {number} HourlyRate - The hourly rate of the pharmacist
 * @prop {string} Affiliation - The affiliation of the pharmacist
 * @prop {string} EducationalBackground - The educational background of the pharmacist
 * @prop {string} Speciality - The speciality of the pharmacist
 */
router.post("/addRequest", createRequest);

// the following routes require authentication
router.use(requireAuth);

// TODO: add type check as middleware if needed
router.put("/updateRequest/:id", updateRequest);

module.exports = router;
