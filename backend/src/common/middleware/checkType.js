const checkAdmin = async (req, res, next) => {
  if (req.user.Type !== "Admin")
    return res
      .status(401)
      .send({ error: "You have to be an admin to perform this request" });
  next();
};

const checkPharmacist = async (req, res, next) => {
  if (req.user.Type !== "Pharmacist")
    return res
      .status(401)
      .send({ error: "You have to be a pharmacist to perform this request" });
  next();
};

const checkPatient = async (req, res, next) => {
  if (req.user.Type !== "Patient")
    return res
      .status(401)
      .send({ error: "You have to be a patient to perform this request" });
  next();
};

const checkUser = (req, res, next) => {
  if (req.user && (req.user.Type === "Doctor" || req.user.Type === "Patient")) {
    next();
  } else {
    res.status(403).json({ error: 'User must be a doctor or a patient' });
  }
};

module.exports = { checkAdmin, checkPharmacist, checkPatient, checkUser };
