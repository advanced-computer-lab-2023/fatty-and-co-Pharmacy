const patientModel = require("../models/patients");
const userModel = require("../models/systemusers");
// const familyMemberModel = require("../models/familymembers");
// const { getAllPatients } = require("./testController");
const { getPatients } = require("./testController");
const subscriptionModel = require("../models/subscriptions");
const packageModel = require("../models/packages");

const getEmergencyContact = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.findOne({ Username: Username });

    console.log(patient);

    if (!patient) {
      res.status(404).send({ message: "Patient not found." });
      return;
    }

    const EmergencyContact = patient.EmergencyContact;
    const Name = patient.Name;
    console.log(Name);
    if (!EmergencyContact) {
      res
        .status(404)
        .send({ message: "Emergency contact not found for the patient." });
      return;
    }

    res.status(200).send({ EmergencyContact });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by id
const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by username
const getPatientUsername = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.find({ Username: Username });
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// I think this is useless?
// if not useless it needs to delete from user model and order model too
const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getWalletAmount = async (req, res) => {
  try {
    const patient = await patientModel.findOne({ Username: req.user.Username });
    if (patient) {
      res.status(200).json({ Wallet: patient.Wallet });
    } else {
      res.status(404).json({ error: "Cannot find wallet!" });
    }
  } catch {
    res.status(404).json({ error: "Error occured while fetching amount!" });
  }
};

const getMedicineDiscount = async (req, res) => {
  try {
    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");
    if (subscription) {
      const discount = subscription.Package.Medicine_Discount;
      res.status(200).send({ discount });
    } 
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getPatientUsernameSocket = async (req, res) => {
  // get username of patient
  try {
    console.log(req.user.Username);
    // const patient = await patientModel.findOne({
    //   Username: req.user.Username,
    // });
    res.status(200).json(req.user.Username);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const viewSubscribedPackage = async (req, res) => {
  try {
    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");
    if (subscription) {
      const package = subscription.Package;
      res.status(200).send({subscription, package});
    } else {
      res.status(404).send({ Error: "Cannot find any current subscriptions!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  getEmergencyContact,
  getWalletAmount,
  getMedicineDiscount,
  getPatientUsernameSocket,
  viewSubscribedPackage,
};
