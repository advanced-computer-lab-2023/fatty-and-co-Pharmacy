const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Active_Ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    Description: {
      type: String,
    },
    Price: {
      type: Number,
      required: true,
    },
    Image: {
      type: String,
    },
    Medicinal_Use: [
      {
        type: String,
        required: true,
      },
    ],
    Sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
module.exports = Medicine;
