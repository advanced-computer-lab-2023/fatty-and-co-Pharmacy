const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
// I think this is useless?
// if not then it need to create a user in systemuser model too using addentry method
const createPharmacist = async (req, res) => {
  const {} = req.body;
  try {
    const pharmacist = await pharmacistModel.create({
      Username: req.body.Username,
      Name: req.body.Name,
      DateOfBirth: req.body.DateOfBirth,
      HourlyRate: req.body.HourlyRate,
      Affiliation: req.body.Affiliation,
      EducationalBackground: req.body.EducationalBackground,
    });
    res.status(200).send({ pharmacist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllPharmacists = async (req, res) => {
  try {
    const pharmacist = await pharmacistModel.find();
    res.status(200).send({ pharmacist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getPharmacist = async (req, res) => {
  try {
    const pharmacist = await pharmacistModel.findById(req.params.id);
    res.status(200).send({ pharmacist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};



// I think this is useless?
// if not useless it needs to delete from user model too
const deletePharmacist = async (req, res) => {
  try {
    const pharmacist = await pharmacistModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ pharmacist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//get all patients in the db with no duplicates for CHAT
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getPharmacistUsernameSocket = async (req, res) => {
  // get username of pharmacist
  try {
    console.log(req.user.Username);
    // const pharmacist = await pharmacistModel.findOne({
    //   Username: req.user.Username,
    // });
    res.status(200).json(req.user.Username);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  createPharmacist,
  getAllPharmacists,
  getPharmacist,
  deletePharmacist,
  getAllPatients,
  getPharmacistUsernameSocket,
};
