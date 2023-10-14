const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
const requestModel = require("../models/requests");
const orderModel = require("../models/orders");
const systemUserModel = require("../models/systemusers");

const { default: mongoose } = require("mongoose");

const createAdmin = async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    const admin = await systemUserModel.create({
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
  const { Username } = req.query;
  try {
    const request = await requestModel.find({ Username: Username });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await requestModel.find();
    res.status(200).json(requests);
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
      if (user && user.Type === "Patient") {
        const patient = await patientModel.findOneAndDelete({ Username: Username });
        const orders = await orderModel.find({ PatientUsername: Username });
        if (orders.length > 0) {
          await orders.deleteMany({ PatientUsername: Username });
        }
        res.status(200).json({ user, patient });
      } else if (user && user.Type == "Pharmacist") {
        const pharmacist = await pharmacistModel.findOneAndDelete({
          Username: Username,
        });      
      res.status(200).json({user, pharmacist});
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// view a Pharmacist's basic information
const viewPharmacist = async (req, res) => {
  const { username } = req.params;

  try {
    const pharmacist = await pharmacistModel.findOne({ Username: username });
    const pharmaUser = await systemUserModel.findOne({ Username: username });
    if (!pharmacist) {
      res.status(404).json({ error: "Pharmacist not found" });
      return;
    }
    let pharmacistObject = pharmacist.toObject();
    pharmacistObject.Email = pharmaUser.Email;
    res.status(200).json(pharmacistObject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// view a Patient's basic information (excluding prescriptions)
const viewPatient = async (req, res) => {
  const { username } = req.params;

  try {
    const patient = await patientModel.findOne({ Username: username });
    const patientUser = await systemUserModel.findOne({
      Username: username,
    });
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    let patientObject = patient.toObject();
    patientObject.Email = patientUser.Email;
    delete patientObject.Prescriptions;
    res.status(200).json(patientObject);
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
  getRequests,
};
