const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
const systemUserModel = require("../models/systemusers");

const { default: mongoose } = require("mongoose");

// view a Pharmacist's basic information
const viewPharmacist = async (req, res) => {
  const { id } = req.params;

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const pharmacist = await pharmacistModel.findById(id);
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
  const { id } = req.params;

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const patient = await patientModel.findById(id);
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

const getRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.find({ Username: Username });
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
    const pharmacist = await pharmacistModel.create({
      Username: Username,
      Name: request.Name,
      DateOfBirth: request.DateOfBirth,
      HourlyRate: request.HourlyRate,
      Affiliation: request.Affiliation,
      EducationalBackground: request.EducationalBackground,
    });
    const user = await userModel.create({
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

module.exports = { viewPharmacist, viewPatient, getRequest, acceptRequest, rejectRequest };
