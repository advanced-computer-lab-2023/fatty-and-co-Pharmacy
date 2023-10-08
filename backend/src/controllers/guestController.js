const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests.js");


const createRequest = async (req, res) => {
  const {} = req.body;
  try {
    const request = await requestModel.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Name: req.body.Name,
      DateOfBirth: req.body.DateOfBirth,
      HourlyRate: req.body.HourlyRate,
      Affiliation: req.body.Affiliation,
      EducationalBackground: req.body.EducationalBackground,
      Status: req.body.Status,
    });
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//turn the data from the request into a doctor object using the doctor controller function createDoctor


module.exports = {
  createRequest
};
 