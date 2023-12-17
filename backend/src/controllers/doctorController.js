const { default: mongoose } = require("mongoose");
const doctorModel = require("../models/doctors");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { getAllDoctors };
