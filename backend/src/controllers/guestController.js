const systemUserModel = require("../models/systemusers");
const patientModel = require("../models/patients");
const requestModel = require("../models/requests.js");
const cartModel = require("../models/cart");
const subscriptionModel = require("../models/subscriptions");

const bcrypt = require("bcrypt");
const { validatePassword } = require("../common/utils/validators");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const generateToken = require("../common/jwt/generateToken");

const createPatient = async (req, res) => {
  const {
    Username,
    Name,
    Password,
    Email,
    MobileNum,
    NationalId,
    DateOfBirth,
    Gender,
    EmergencyContactNumber,
    EmergencyContactName,
    EmergencyContactRelation,
    Wallet,
  } = req.body;
  try {
    const user = await systemUserModel.addEntry(
      Username,
      Password,
      Email,
      "Patient"
    );
    const patient = await patientModel.create({
      Username: Username,
      Name: Name,
      MobileNum: MobileNum,
      NationalId: NationalId,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      EmergencyContact: {
        FullName: EmergencyContactName,
        PhoneNumber: EmergencyContactNumber,
        Relation: EmergencyContactRelation,
      },
      LinkedPatients: [],
      Wallet: Wallet,
    });
    await subscriptionModel.addEntry(patient, "Unsubscribed");
    const cart = await cartModel.create({
      PatientUsername: Username,
      TotalCost: 0,
      Medicine: [],
    });
    res.status(200).send({ patient, user, cart });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createRequest = async (req, res) => {
  const {
    Username,
    Email,
    Password,
    Name,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  const { IdFile, WorkingLicense, PharmacyDegree } = req.files;
  const IdFileName = IdFile[0].filename;
  const WorkingLicenseName = WorkingLicense[0].filename;
  const PharmacyDegreeName = PharmacyDegree[0].filename;

  try {
    const request = await requestModel.create({
      Username,
      Email,
      Password,
      Name,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      Status: "Pending",
      IdFileName,
      WorkingLicenseName,
      PharmacyDegreeName,
    });
    res.status(200).send({ request });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await requestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { Username, Password } = req.body;
  try {
    const user = await systemUserModel.login(Username, Password);
    const token = generateToken(user);
    res.status(200).send({ token, userType: user.Type });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//turn the data from the request into a doctor object using the doctor controller function createDoctor

const transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shebeenhealthclinic@gmail.com",
    pass: "xojm teqp otis nknr",
  },
});

const sendOTP = async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await systemUserModel.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      alphabets: false,
    });
    const test = await systemUserModel.findOneAndUpdate(
      { Email: Email },
      { $set: { otp: otp, otpDuration: Date.now() + 600000 } },
      { new: true }
    );
    // user.otp = otp;
    // user.otpDuration = Date.now() + 600000;
    // user.save();
    //res.cookie('otp', otp, { httpOnly: true, maxAge: 600000 , sameSite: 'None', secure: true});

    //console.log('Set-Cookie Header:', res.getHeaders()['set-cookie']);

    await transporter.sendMail({
      to: Email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const validateOTP = async (req, res) => {
  const { Email, otp } = req.body;

  try {
    const user = await systemUserModel.findOne({ Email: Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user.otp);
    console.log(user.otpDuration);
    console.log(otp);
    console.log(Date.now());
    if (user.otp !== otp || Date.now() > user.otpDuration) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePass = async (req, res) => {
  try {
    const Username = req.user.Username;
    const { OldPassword, NewPassword } = req.body;

    if (!OldPassword) {
      throw Error("Please enter the old password!");
    }
    if (!NewPassword) {
      throw Error("Please enter the new password!");
    }

    if (OldPassword === NewPassword) {
      throw Error("Cannot enter the same password");
    }

    const test = await systemUserModel.findOne({ Username: Username });
    const passwordMatch = await bcrypt.compare(OldPassword, test.Password);

    if (!passwordMatch) {
      throw Error("Incorrect password");
    }

    if (!validatePassword(NewPassword)) {
      throw Error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    }
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(NewPassword, salt);
    console.log(Username);
    const user = await systemUserModel.findOneAndUpdate(
      { Username: Username },
      { Password: hash }
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const resetPass = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const test = await systemUserModel.findOne({ Email: Email });

    if (!Password) {
      throw Error("Please enter the new password!");
    }
    const passwordMatch = await bcrypt.compare(Password, test.Password);

    if (passwordMatch) {
      throw Error("Cannot enter the same password");
    }

    if (!validatePassword(Password)) {
      throw Error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
      );
    }
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(Password, salt);
    console.log(Email);
    const user = await systemUserModel.findOneAndUpdate(
      { Email: Email },
      { Password: hash }
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  createRequest,
  updateRequest,
  createPatient,
  login,
  updatePass,
  sendOTP,
  validateOTP,
  resetPass,
};
