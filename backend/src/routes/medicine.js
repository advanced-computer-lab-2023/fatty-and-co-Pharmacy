const express = require("express");
const {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  filterMedicine,
  getMedicine,
} = require("../controllers/medicineController");

const { checkPharmacist } = require("../common/middleware/checkType");

// Create the router
const router = express.Router();

// GET All medicines (has search functionality if you pass name/medicinaluse in a query string )
router.get("/getMedicines", getMedicines);

// GET a specific medicine by name
router.get("/getMedicine/:Name", getMedicine);

// POST create a new medicine
router.post("/addMedicine", checkPharmacist, createMedicine);

// DELETE a medicine
router.delete("/deleteMedicine/:id", checkPharmacist, deleteMedicine);

// update a medicine by id
router.patch("/updateMedicine/:id", checkPharmacist, updateMedicine);

//filter Medicine by medicinal yse
router.get("/filter", filterMedicine);

module.exports = router;
