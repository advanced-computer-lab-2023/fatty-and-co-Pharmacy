const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");

const checkout = async (req, res) => {
  try {
    const username = req.user.Username;
    const cart = await cartModel.findOne({ PatientUsername: username });
    const patient = await patientModel.findOne({ Username: username });
    console.log(patient);
    console.log(username);
    const wallet = patient.Wallet;
    const medicine = cart.Medicine;
    const totalCost = cart.TotalCost;
    console.log(cart);

    const paymentMethod = req.query.PaymentMethod;
    const details = req.query.Details;
    const deliveryAddress = req.query.DeliveryAddress;
    if (paymentMethod == "Wallet") {
      if (wallet < totalCost) {
        res.status(400).send({ message: "Insufficient wallet balance" });
        return;
      } else {
        const newWallet = wallet - totalCost;
        patient.Wallet = newWallet;
        await patient.save();
      }
    }
    const newOrder = await orderModel.create({
      PatientUsername: username,
      Date: new Date(),
      // Status: "In Progress",
      Medicine: medicine,
      Details: details,
      TotalCost: totalCost,
      PaymentMethod: paymentMethod,
      DeliveryAddress: deliveryAddress,
    });
    await newOrder.save();
    cart.TotalCost = 0;
    cart.Medicine = [];
    await cart.save();
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  checkout,
};
