const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");

const checkout = async (req, res) => {
  try {
    const username = req.user.Username;
    const cart = await cartModel.findOne({ PatientUsername: username });
    const patient = await patientModel.findOne({ PatientUsername: username });
    const wallet = patient.Wallet;
    const medicine = cart.Medicine;
    const totalCost = cart.TotalCost;
    console.log(cart);

    const paymentMethod = req.query.PaymentMethod;
    const details = req.query.Details;
    const deliveryAddress = req.query.DeliveryAddress;
    if (paymentMethod == "Wallet") {
      if (wallet < totalCost) {
        res.status(400).send({ message: "YOU ARE POOR" });
        return;
      } else {
        const patientnew = await patientModel.findOneAndUpdate(
          {
            PatientUsername: username,
            Wallet: wallet - totalCost,
          },
          { new: true }
        );
      }
    }
    const newOrder = await orderModel.create({
      PatientUsername: username,
      Date: new Date(),
      Status: "Pending",
      Medicine: medicine,
      Details: details,
      TotalCost: totalCost,
      PaymentMethod: paymentMethod,
      DeliveryAddress: deliveryAddress,
    });
    await newOrder.save();
    const newmed = [];
    const newcost = 0;
    await cartModel.findOneAndUpdate({
      PatientUsername: username,
      Medicine: newmed,
      TotalCost: newcost,
    });
    res.status(200).send({ message: newOrder });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  checkout,
};
