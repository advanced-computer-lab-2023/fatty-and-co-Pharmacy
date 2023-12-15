const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const medicineModel = require("../models/medicine");

const checkout = async (req, res) => {
  try {
    const username = req.user.Username;
    const cart = await cartModel.findOne({ PatientUsername: username });
    const patient = await patientModel.findOne({ Username: username });
    const wallet = patient.Wallet;
    const medicine = cart.Medicine;
    const totalCost = cart.TotalCost;

    const paymentMethod = req.query.PaymentMethod;
    const details = req.query.Details;
    const deliveryAddress = req.query.DeliveryAddress;

    if (totalCost == 0) {
      res.status(400).send({
        message: `Your cart is empty. Please add your items to cart before checking out.`,
      });
      return;
    }

    // Get quantity of each medicine and remove it from medicine model.
    const medicineQuantityMap = new Map();

    cart.Medicine.forEach((medicineId) => {
      const stringMedicineId = medicineId.toString();
      if (medicineQuantityMap.has(stringMedicineId)) {
        medicineQuantityMap.set(
          stringMedicineId,
          medicineQuantityMap.get(stringMedicineId) + 1
        );
      } else {
        medicineQuantityMap.set(stringMedicineId, 1);
      }
    });

    for (const [medicineId, quantity] of medicineQuantityMap.entries()) {
      const medicine = await medicineModel.findById(medicineId);
      if (medicine.Quantity < quantity) {
        // Remove extra meds in the cart.
        const instancesToRemove = quantity - medicine.Quantity;
        for (let i = 0; i < instancesToRemove; i++) {
          const indexToRemove = cart.Medicine.indexOf(medicineId);
          if (indexToRemove !== -1) {
            cart.Medicine.splice(indexToRemove, 1);
            cart.TotalCost -= medicine.Price;
          }
        }
        await cart.save();
        res.status(400).send({
          message: `Sorry, we only have ${medicine.Quantity} of ${medicine.Name} in stock.`,
        });
        return;
      }
      medicine.Quantity -= quantity;
      medicine.Sales += quantity;
      await medicine.save();
    }

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
    const orders = await orderModel
      .find({ PatientUsername: username })
      .populate("Medicine");
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
    const { OrderId } = req.body;
    const order = await orderModel.findOne({ _id: OrderId });
    if (order.Status == "Completed") {
      res.status(400).send({ message: "Order is already completed" });
      return;
    }
    if (order.Status == "Cancelled") {
      res.status(400).send({ message: "Order is already cancelled" });
      return;
    }
    // set order status to cancelled
    order.Status = "Cancelled";
    await order.save();

    // refund patient wallet
    if (order.PaymentMethod != "Cash") {
      const patient = await patientModel.findOne({
        Username: order.PatientUsername,
      });
      const wallet = patient.Wallet;
      const newWallet = wallet + order.TotalCost;
      patient.Wallet = newWallet;
      await patient.save();
    }
    // update medicine sales and quantity
    const medicines = order.Medicine;
    for (let i = 0; i < medicines.length; i++) {
      const medicine = await medicineModel.findOne({ _id: medicines[i] });
      const sales = medicine.Sales;
      const quantity = medicine.Quantity;
      const newSales = sales - 1;
      const newQuantity = quantity + 1;
      medicine.Sales = newSales;
      medicine.Quantity = newQuantity;
      await medicine.save();
    }

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
