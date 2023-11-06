const systemUserModel = require("../models/systemusers");
const patientModel = require("../models/patients");
const requestModel = require("../models/requests.js");

const generateToken = require("../common/jwt/generateToken");

const createPatient = async (req, res) => {
  const {
    Username,
    Name,
    Password,
    Email,
    MobileNum,
    DateOfBirth,
    Gender,
    EmergencyContactNumber,
    EmergencyContactName,
    EmergencyContactRelation,
  } = req.body;
  try {
    const user = await systemUserModel.addEntry(
      Username,
      Password,
      Email,
      "Patient"
    );
    const patient = await patientModel.create({
      Username: Username,
      Name: Name,
      MobileNum: MobileNum,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      EmergencyContact: {
        FullName: EmergencyContactName,
        PhoneNumber: EmergencyContactNumber,
        Relation: EmergencyContactRelation,
      },
    });
    res.status(200).send({ patient, user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createRequest = async (req, res) => {
  const {
    Username,
    Email,
    Password,
    Name,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  try {
    const request = await requestModel.create({
      Username,
      Email,
      Password,
      Name,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      Status: "Pending",
    });
    res.status(200).send({ request });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await requestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { Username, Password } = req.body;
  try {
    const user = await systemUserModel.login(Username, Password);
    const token = generateToken(user);
    res.status(200).send({ token, userType: user.Type });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//turn the data from the request into a doctor object using the doctor controller function createDoctor

module.exports = {
  createRequest,
  updateRequest,
  createPatient,
  login,
};
