const express = require("express");
const {
  createRequest,
  updateRequest,
  createPatient,
  login,
  updatePass,
  sendOTP,
  validateOTP,
  resetPass,
  cartLogin,
  getNotifs,
  viewNotif,
} = require("../controllers/guestController");
const requireAuth = require("../common/middleware/requireAuth");
const { pharmUpload } = require("../common/middleware/pharmUpload");

const router = express.Router();

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.post("/login", login);
router.post("/cartLogin", cartLogin);
router.post("/sendOTP", sendOTP);
router.post("/validateOTP", validateOTP);

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
 * @prop {file} IdFile - The id file of the pharmacist
 * @prop {file} WorkingLicense - The working license of the pharmacist
 * @prop {file} PharmacyDegree - The pharmacy degree of the pharmacist
 */
router.post("/addRequest", pharmUpload, createRequest);
router.patch("/resetPass/", resetPass);


// the following routes require authentication
router.use(requireAuth);
router.get("/getNotifs", getNotifs);
router.patch("/viewNotif", viewNotif);
// TODO: add type check as middleware if needed
router.put("/updateRequest/:id", updateRequest);

router.patch("/updatePass/", updatePass);

module.exports = router;
