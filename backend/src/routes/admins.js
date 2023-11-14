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
  getRequestFile
} = require("../controllers/adminController");

const { checkAdmin } = require("../common/middleware/checkType");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins");
});
4;

// middleware to check if user is an admin
router.use(checkAdmin);

// ALL OF THE FOLLOWING ROUTES CAN ONLY BE ACCESSED BY ADMINS

router.get("/requests", getRequests);

router.post("/addAdmin", createAdmin);

router.get("/getRequest", getRequest);

router.get("/getRequestFile/:filename", getRequestFile);

router.post("/acceptRequest", acceptRequest);

router.put("/rejectRequest", rejectRequest);

router.delete("/deleteUser", deleteUser);

router.get("/viewPharmacist/:username", viewPharmacist);

router.get("/viewPatient/:username", viewPatient);

module.exports = router;
