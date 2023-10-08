const pharmacistModel = require("../models/pharmacists");

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

const deletePharmacist = async (req, res) => {
  try {
    const pharmacist = await pharmacistModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ pharmacist });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  createPharmacist,
  getAllPharmacists,
  getPharmacist,
  deletePharmacist,
};
