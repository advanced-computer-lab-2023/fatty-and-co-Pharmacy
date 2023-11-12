const express = require("express");
const {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  filterMedicine,
  getMedicine,
  downloadFile,
} = require("../controllers/medicineController");

const { checkPharmacist } = require("../common/middleware/checkType");
const { upload } = require("../common/middleware/upload");

// Create the router
const router = express.Router();

// GET All medicines (has search functionality if you pass name/medicinaluse in a query string )
router.get("/getMedicines", getMedicines);

// GET a specific medicine by name
router.get("/getMedicine/:Name", getMedicine);

// POST create a new medicine
const Medicine_middleware = {
  checkPharmacist,
  upload
}
router.post("/addMedicine", [Medicine_middleware.checkPharmacist,Medicine_middleware.upload.single("MImage")], createMedicine);

// DELETE a medicine
router.delete("/deleteMedicine/:id", checkPharmacist, deleteMedicine);

// update a medicine by id
router.patch("/updateMedicine/:id", checkPharmacist, updateMedicine);

//filter Medicine by medicinal yse
router.get("/filter", filterMedicine);

/**
 * @route GET /patients/downloadFile
 * @desc Downloads a image
 * @access any user can access
 * @param {string} filename - The filename in the params
 */
router.get("/downloadFile/:filename", downloadFile); 

module.exports = router;
