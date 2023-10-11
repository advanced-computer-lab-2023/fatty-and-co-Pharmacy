const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
const requestModel = require("../models/requests");
const systemUserModel = require("../models/systemusers");

const { default: mongoose } = require("mongoose");

const createAdmin = async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    const admin = await userModel.create({
      Username: Username,
      Password: Password,
      Email: Email,
      Type: "Admin",
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requests.find({ Username: Username });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate({
      Username: Username,
      Status: "Accepted",
    });
    const doc = await pharmacistModel.create({
      Username: Username,
      Name: request.Name,
      DateOfBirth: request.DateOfBirth,
      HourlyRate: request.HourlyRate,
      Affiliation: request.Affiliation,
      EducationalBackground: request.EducationalBackground,
    });
    const user = await systemUserModel.create({
      Username: Username,
      Password: request.Password,
      Email: request.Email,
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const rejectRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate({
      Username: Username,
      Status: "Rejected",
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { Username } = req.body;
  try {
    const user = await systemUserModel.findOneAndDelete({ Username: Username });
    if (user.Type == "Patient") {
      const patient = await patientModel.findOneAndDelete({
        Username: Username,
      });
    } else if (user.Type == "Pharmacist") {
      const doctor = await pharmacistModel.findOneAndDelete({
        Username: Username,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// view a Pharmacist's basic information
const viewPharmacist = async (req, res) => {
  const { username } = req.params;

  try {
    const pharmacist = await pharmacistModel.find({ Username: username });
    if (!pharmacist) {
      res.status(404).json({ error: "Pharmacist not found" });
      return;
    }
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// view a Patient's basic information (excluding prescriptions)
const viewPatient = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await patientModel.find({ Username: username });
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    delete patient.Prescriptions;
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  viewPharmacist,
  viewPatient,
  createAdmin,
  getRequest,
  deleteUser,
  acceptRequest,
  rejectRequest,
};
