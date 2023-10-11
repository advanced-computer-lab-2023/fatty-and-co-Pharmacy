const express = require("express");
const {
  viewPharmacist,
  viewPatient,
  getRequest,
  getRequests,
  createAdmin,
  deleteUser,
  acceptRequest,
  rejectRequest,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});

router.get("/requests", getRequests);

router.post("/addAdmin", createAdmin);

router.get("/getRequest", getRequest);

router.post("/acceptRequest", acceptRequest);

router.put("/rejectRequest", rejectRequest);

router.delete("/deleteUser", deleteUser);

router.get("/viewPharmacist/:username", viewPharmacist);

router.get("/viewPatient/:username", viewPatient);

module.exports = router;
