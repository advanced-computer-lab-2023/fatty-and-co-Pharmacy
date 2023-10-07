const express = require("express");
const {
  createMedicine,
  getMedicines,
  getMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

// Create the router
const router = express.Router();

// GET All medicines
router.get("/medicines", getMedicines);

// GET a medicine by Name
router.get("/:Name", getMedicine);

// POST create a new medicine
router.post("/addMedicine", createMedicine);

// DELETE a medicine
router.delete("/deleteMedicine/:id", deleteMedicine);

// update a medicine by id
router.patch("/updateMedicine/:id", updateMedicine);

module.exports = router;