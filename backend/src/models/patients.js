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
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    EmergencyContact: {
      type: { FullName: String, PhoneNumber: Number }, //NOT SURE OF THIS SYNTAX
      required: false,
    },
    // TODO: change this
    // FamilyMem: {
    //   type: [ImportFamObject.FamilyMem], //NOT SURE MEN LAW DA VALID TYPE
    //   required: false,
    // },
    // TODO: add prescriptions
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
