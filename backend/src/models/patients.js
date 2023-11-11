const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
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
    MobileNum: {
      type: Number,
      required: true,
      unique: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    EmergencyContact: {
      type: { FullName: String, PhoneNumber: Number, Relation: String }, //NOT SURE OF THIS SYNTAX
      required: false,
    },
    // TODO: properly add prescriptions
    Prescriptions: {
      type: [String],
      required: false,
    },
    Wallet: {
      type: Number,
      required: true,
      default: 10000,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
