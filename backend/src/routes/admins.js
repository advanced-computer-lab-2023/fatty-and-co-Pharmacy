const express = require("express");
const {
  viewPharmacist,
  viewPatient,
  getRequest,
  acceptRequest,
  rejectRequest
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.get("/viewPharmacist/:username", viewPharmacist);

router.get("/viewPatient/:username", viewPatient);

router.get("/getRequest", getRequest);

router.post("/acceptRequest", acceptRequest);

router.put("/rejectRequest", rejectRequest);

module.exports = router;
