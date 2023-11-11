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

const getOrders = async (req, res) => {
  try {
    const username = req.user.Username;
    const orders = await orderModel.find({ PatientUsername: username });
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getOrderDetailsandStatus = async (req, res) => {
  try {
    const OrderId = req.query.OrderId;
    const order = await orderModel.findOne({ _id: OrderId });
    delete order.PatientUsername;
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const OrderId = req.query.OrderId;
    const order = await orderModel.findOne({ _id: OrderId });
    if (order.Status == "Completed") {
      res.status(400).send({ message: "Order is already completed" });
      return;
    }
    order.Status = "Cancelled";
    await order.save();
    const patient = await patientModel.findOne({
      Username: order.PatientUsername,
    });
    const wallet = patient.Wallet;
    const newWallet = wallet + order.TotalCost;
    patient.Wallet = newWallet;
    await patient.save();
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  checkout,
  getOrders,
  getOrderDetailsandStatus,
  cancelOrder,
};
