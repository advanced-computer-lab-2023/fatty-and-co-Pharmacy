const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
const systemUserModel = require("../models/systemusers");
const medicineModel = require("../models/medicine");
const requestModel = require("../models/requests");
const orderModel = require("../models/orders");
const { default: mongoose } = require("mongoose");
const {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
  generateSpeciality,
  generateMobileNum,
  generatePackage,
  generateEmail,
  generatePassword,
  generateMedicineDetails,
  generateGender,
} = require("../common/utils/generators");
const { request } = require("express");

// create a new System User
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const email = Email || generateEmail();
  const type = Type || "Admin";
  try {
    const newUser = await systemUserModel.addEntry(
      username,
      password,
      email,
      type
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a random pharmacist
const createPharmacist = async (req, res) => {
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

  const username = Username || generateUsername();
  const email = Email || generateEmail();
  const password = Password || generatePassword();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const hourlyRate = HourlyRate || generateHourlyRate();
  const affiliation = Affiliation || generateAffiliation();
  const educationalBackground =
    EducationalBackground || generateEducationalBackground();

  try {
    await requestModel.create({
      Username: username,
      Email: email,
      Password: password,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
      Status: "Accepted",
    });
    await systemUserModel.addEntry(username, password, email, "Pharmacist");
    const newPharmacist = await pharmacistModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
    });
    res.status(201).json(newPharmacist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a random patient
const createPatient = async (req, res) => {
  const {
    Username,
    Name,
    Password,
    DateOfBirth,
    MobileNum,
    EmergencyContact,
    Gender,
  } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const mobileNum = MobileNum || generateMobileNum();
  const emergencyContact = EmergencyContact || {
    FullName: generateName(),
    PhoneNumber: generateMobileNum(),
  };
  const password = Password || generatePassword();
  const gender = Gender || generateGender();

  try {
    await systemUserModel.addEntry(
      username,
      password,
      generateEmail(),
      "Patient"
    );
    const newPatient = await patientModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      MobileNum: mobileNum,
      Gender: gender,
      EmergencyContact: emergencyContact,
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a random medicine
const createMedicine = async (req, res) => {
  const {
    Name,
    Quantity,
    Active_Ingredients,
    Description,
    Price,
    Image,
    Medicinal_Use,
    Sales,
    MedicationType,
  } = req.body;

  const {
    name,
    quantity,
    activeIngredients,
    description,
    price,
    image,
    medicinalUse,
    sales,
    medicationType,
  } = generateMedicineDetails();

  const finalName = Name || name;
  const finalQuantity = Quantity || quantity;
  const finalActive_Ingredients = Active_Ingredients || activeIngredients;
  const finalDescription = Description || description;
  const finalPrice = Price || price;
  const finalImage = Image || image;
  const finalMedicinal_Use = Medicinal_Use || medicinalUse;
  const finalSales = Sales || sales;
  const finalMedicationType = MedicationType || medicationType;

  try {
    const newMedicine = await medicineModel.create({
      Name: finalName,
      Quantity: finalQuantity,
      Active_Ingredients: finalActive_Ingredients,
      Description: finalDescription,
      Price: finalPrice,
      Image: finalImage,
      Medicinal_Use: finalMedicinal_Use,
      Sales: finalSales,
      MedicationType: finalMedicationType,
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all users
const getSystemUsers = async (req, res) => {
  try {
    const users = await systemUserModel.find({}).sort({ type: 1 }); // sorts by username in ascending order
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await systemUserModel
      .find({ Type: "Admin" })
      .sort({ Username: 1 }); // sorts by username in ascending order
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all pharmacists
const getPharmacists = async (req, res) => {
  try {
    const pharmacists = await pharmacistModel.find({}).sort({ Name: 1 }); // sorts by username in ascending order
    res.status(200).json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.find({}).sort({ Name: 1 }); // sorts by username in ascending order
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystemUser,
  createPharmacist,
  createPatient,
  getSystemUsers,
  getAdmins,
  getPharmacists,
  getPatients,
  createMedicine,
};
