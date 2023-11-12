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

  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMedicines = async (req, res) => {
  const { Name, Medicinal_Use } = req.query;

  //retrieve all Medicine from the database
  try {
    const Medicine = await medicineModel.find({
      // Search for documents whose 'Name' field contains the 'Name' variable, if it is not empty
      ...(Name ? { Name: { $regex: Name.trim(), $options: "i" } } : {}),
      ...(Medicinal_Use ? { Medicinal_Use: { $in: Medicinal_Use } } : {}),
    });
    res.status(200).json(Medicine);
  } catch (err) {
    res.status(404).json({ message: "No Medicine found" });
  }
};

// Update a Medicine by details or price
const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Quantity,
      Active_Ingredients,
      Medicinal_Use,
      State,
      Description,
      Price,
      Image,
      Sales,
      MedicationType,
    } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Medicine with id: ${id}`);

    const updatedMedicine = {
      Name,
      Quantity,
      Active_Ingredients,
      Description,
      Price,
      Medicinal_Use,
      State,
      Image,
      Sales,
      MedicationType,
      _id: id,
    };
    const newMed = await medicineModel.findByIdAndUpdate(id, updatedMedicine, {
      new: true,
    });

    res.status(200).json(newMed);
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

//filter medicine by medicinal use
const filterMedicine = async (req, res) => {
  const { MedicinalUse } = req.body;
  let Meds = new Array();

  try {
    if (MedicinalUse) {
      Meds = await medicineModel.find({
        Medicinal_Use: { $regex: MedicinalUse, $options: "i" },
      });
    } else {
      Meds = await medicineModel.find();
    }

    if (Meds.length === 0) {
      res.status(200).json({ error: "Medicines not found" });
      return;
    }
    res.status(200).json(Meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// retrieve a specific Medicine by Name
const getMedicine = async (req, res) => {
  try {
    const { Name } = req.params;
    const medicine = await medicineModel.find({
      ...(Name ? { Name: { $regex: Name, $options: "i" } } : {}),
    });
    res.status(200).json(medicine);
  } catch (err) {
    res.status(404).json({ message: "No Medicine found" });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  filterMedicine,
  getMedicine,
};
