// #Task route solution
const medicineModel = require("../models/medicine");
const { default: mongoose } = require("mongoose");

const createMedicine = async (req, res) => {
  //add a new Medicine to the database with
  const {
    Name,
    Quantity,
    Active_Ingredients,
    Description,
    Price,
    Image,
    Sales,
    Medicinal_Use,
  } = req.body;
  const newMedicine = new medicineModel({
    Name: Name,
    Quantity: Quantity,
    Active_Ingredients: Active_Ingredients,
    Description: Description,
    Price: Price,
    Image: Image,
    Sales: Sales,
    Medicinal_Use: Medicinal_Use,
  });

  await newMedicine.save();
  res.status(200).json(newMedicine);
};

const getMedicines = async (req, res) => {
  //retrieve all Medicine from the database
  try {
    const Medicine = await medicineModel.find();
    res.status(200).json(Medicine);
  } catch (err) {
    res.status(404).json({ message: "No Medicine found" });
  }
};

// retrieve a specific Medicine by Name
const getMedicine = async (req, res) => {
  try {
    const { Name } = req.params;
    const medicine = await medicineModel.find({
      Name: { $regex: Name, $options: "i" },
    });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(404).json({ message: "No Medicine found" });
  }
};

// Update a Medicine
const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Quantity,
      Active_Ingredients,
      Description,
      Price,
      Image,
      Sales,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Medicine with id: ${id}`);

    const updatedMedicine = {
      Name,
      Quantity,
      Active_Ingredients,
      Description,
      Price,
      Image,
      Sales,
      _id: id,
    };
    await medicineModel.findByIdAndUpdate(id, updatedMedicine, { new: true });
    res.status(200).json(updatedMedicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Medicine
const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const Medicine = await medicineModel.findOneAndDelete({ _id: id });
    if (!Medicine) throw new Error("No Medicine  with that id");
    res.status(200).json(Medicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
};
