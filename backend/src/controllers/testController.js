const pharmacistModel = require("../models/pharmacists");
const patientModel = require("../models/patients");
const systemUserModel = require("../models/systemusers");
const medicineModel = require("../models/medicine");
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
} = require("../common/utils/generators");

// create a new System User
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const email = Email || generateEmail();
  const type = Type || "Admin";
  try {
    const newUser = await systemUserModel.create({
      Username: username,
      Password: password,
      Email: email,
      Type: type,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a random pharmacist
const createPharmacist = async (req, res) => {
  const {
    Username,
    Name,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const hourlyRate = HourlyRate || generateHourlyRate();
  const affiliation = Affiliation || generateAffiliation();
  const educationalBackground =
    EducationalBackground || generateEducationalBackground();

  try {
    await systemUserModel.create({
      Username: username,
      Email: generateEmail(),
      Password: generatePassword(),
      Type: "Pharmacist",
    });
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
  const { Username, Name, DateOfBirth, MobileNum } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const mobileNum = MobileNum || generateMobileNum();

  try {
    await systemUserModel.create({
      Username: username,
      Email: generateEmail(),
      Password: generatePassword(),
      Type: "Patient",
    });
    const newPatient = await patientModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      MobileNum: mobileNum,
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
  } = req.body;

  const {
    name,
    quantity,
    active_ingredients,
    description,
    price,
    image,
    medicinal_use,
    sales,
  } = generateMedicineDetails();

  const finalName = Name || name;
  const finalQuantity = Quantity || quantity;
  const finalActive_Ingredients = Active_Ingredients || active_ingredients;
  const finalDescription = Description || description;
  const finalPrice = Price || price;
  const finalImage = Image || image;
  const finalMedicinal_Use = Medicinal_Use || medicinal_use;
  const finalSales = Sales || sales;

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
