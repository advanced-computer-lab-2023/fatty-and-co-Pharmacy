const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    ref: "User",
  },
  Name: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  HourlyRate: {
    type: Number,
    required: true,
  },
  Affiliation: {
    type: String,
    required: true,
  },
  EducationalBackground: {
    type: String,
    required: true,
  },
  Wallet: {
    type: Number,
    required: true,
    default: 5000,
  },
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
module.exports = Pharmacist;
