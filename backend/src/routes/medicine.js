const express = require("express");
const {
  createMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
  filterMedicine,
} = require("../controllers/medicineController");

// Create the router
const router = express.Router();

// GET All medicines
router.get("/medicines", getMedicines);

// GET a medicine by Name
//changed it from /:Name to /getMedicine/:Name 
//because in the first case if the user entered any value
//even if not a medicine name this will get called
router.get("/getMedicine/:Name", getMedicine);

// POST create a new medicine
router.post("/addMedicine", createMedicine);

// DELETE a medicine
router.delete("/deleteMedicine/:id", deleteMedicine);

// update a medicine by id
router.patch("/updateMedicine/:id", updateMedicine);

//filter Medicine by medicinal yse
router.get("/filter", filterMedicine);

module.exports = router;
