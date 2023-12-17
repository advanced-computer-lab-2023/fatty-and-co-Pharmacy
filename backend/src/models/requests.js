const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const {
  validateEmail,
  validatePassword,
} = require("../common/utils/validators");

const requestSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    Password: {
      type: String,
      required: true,
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
      type: Number, //NOT SURE OF TYPE
      required: true,
    },
    Affiliation: {
      type: String,
      required: true, //ASSUMING ONE HOSPITAL LAW LA DO A SUBSCHEMA BADAL STRING ZAY FAM RELATIVES
    },
    EducationalBackground: {
      type: String, //Assuming just medicine degree aw 7aga
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
      default: "Pending",
    },
    IdFileName: {
      type: String,
    },
    WorkingLicenseName: {
      type: String,
    },
    PharmacyDegreeName: {
      type: String,
    },
    Type :{
      type: String,
      enum: ["Doctor", "Pharmacist"],
    },
  },
  { timestamps: true }
);

requestSchema.statics.addEntry = async function (
  username,
  password,
  email,
  name,
  dateOfBirth,
  hourlyRate,
  affiliation,
  educationalBackground,
  idFileName,
  workingLicenseName,
  pharmacyDegreeName,
) {
  // validation done here instead of in db because password will be hashed by the time it reaches the db
  if (!validatePassword(password)) {
    throw Error(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const request = await this.create({
    Username: username,
    Password: hash,
    Email: email,
    Name: name,
    DateOfBirth: dateOfBirth,
    HourlyRate: hourlyRate,
    Affiliation: affiliation,
    EducationalBackground: educationalBackground,
    Status: "Pending",
    IdFileName: idFileName,
    WorkingLicenseName: workingLicenseName,
    PharmacyDegreeName: pharmacyDegreeName,
  });

  return request;
};

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
