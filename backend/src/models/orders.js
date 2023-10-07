const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  PatientUsername: {
    type: String,
    required: true,
    trim: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pending", "In Progress", "Cancelled", "Completed"],
    required: true,
  },
  Details: {
    type: String,
    required: true,
  },
  TotalCost: {
    type: Number,
    required: true,
  },
  PaymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card"],
    required: true,
  },
  //TODO: add array of medicine
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;