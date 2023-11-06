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

module.exports = { checkAdmin, checkPharmacist, checkPatient };
