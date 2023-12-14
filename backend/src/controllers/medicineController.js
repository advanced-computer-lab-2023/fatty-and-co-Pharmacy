// #Task route solution
const medicineModel = require("../models/medicine");
const { default: mongoose } = require("mongoose");
const { getFileByFilename } = require("../common/middleware/upload");

const createMedicine = async (req, res) => {
  //add a new Medicine to the database with
  const {
    Name,
    Quantity,
    Active_Ingredients,
    Description,
    Price,
    Sales,
    Medicinal_Use,
  } = req.body;
  const filename = req.file.filename;
  const originalname = req.file.originalname;
  const UpdatedMedicinalUse = Medicinal_Use.split(",");
  const UpdatedActiveIngredients = Active_Ingredients.split(",");
  try {
    const newMedicine = new medicineModel({
      Name: Name,
      Quantity: Quantity,
      Active_Ingredients: UpdatedActiveIngredients,
      Description: Description,
      Price: Price,
      Image: { filename: filename, originalname: originalname },
      Sales: Sales,
      Medicinal_Use: UpdatedMedicinalUse,
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
      Sales,
      MedicationType,
    } = req.body;
    let filename;
    let originalname;
    let isImage = true;
    try {
      filename = req.file.filename;
      originalname = req.file.originalname;
    } catch (error) {
      isImage = false;
    }
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Medicine with id: ${id}`);

    const UpdatedMedicinalUse = Medicinal_Use.split(",");
    const UpdatedActiveIngredients = Active_Ingredients.split(",");
    const updatedMedicine = {
      Name,
      Quantity,
      Active_Ingredients: UpdatedActiveIngredients,
      Description,
      Price,
      Medicinal_Use: UpdatedMedicinalUse,
      State,
      Sales,
      MedicationType,
      _id: id,
      ...(isImage && { Image: { filename: filename, originalname: originalname } }),
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

// retrive the image of a specific Medicine by filename
const downloadFile = async (req, res) => {
  const { filename } = req.params;
  const downloadStream = await getFileByFilename(filename);
  downloadStream.pipe(res);
};

module.exports = {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  filterMedicine,
  getMedicine,
  downloadFile,
};
