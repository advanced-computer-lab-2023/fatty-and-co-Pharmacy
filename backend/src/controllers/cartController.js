const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const medicineModel = require("../models/medicine");

const viewCart = async (req, res) => {
    const username = req.user.Username;
    try {
      const cart = await cartModel.find({ PatientUsername: username });
    
      res.status(200).send({ cart });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

//   const deleteItem = async (req, res) => {
//     const username = req.user.Username;
//     const medicineID = req.query.medicineID;

//     try {
//       const cart = await cartModel.find({ PatientUsername: username });
//       const medicine = cart.Medicine;
//       const filteredNumbers = medicine.filter(function(number) {
//         return number !== medicineID;
//       });

//       res.status(200).send({ newcart });
//     } catch (error) {
//       res.status(400).send({ message: error.message });
//     }
//   };
const deleteItem = async (req, res) => {
    try {
        const Username = req.user.Username;
        const MedicineID = req.query.Medicine;
        const cart = await cartModel.findOne({ PatientUsername: Username });

        if (!cart) {
            return res.status(400).send({ message: "Cart not found" });
        }

        const updatedMedicine = cart.Medicine.filter(itemID => itemID !== MedicineID);

        if (updatedMedicine.length === cart.Medicine.length) {
            return res.status(400).send({ message: "Medicine not found in the cart" });
        }

        // Calculate the updated TotalCost by finding the prices of removed medicines.
        const removedMedicine = cart.Medicine.filter(itemID => itemID === MedicineID);
        let totalPriceToRemove = 0;

        for (const itemID of removedMedicine) {
            const medicine = await medicineModel.findById(itemID);

            if (medicine) {
                totalPriceToRemove += medicine.Price;
            }
        }

        cart.TotalCost -= totalPriceToRemove;

        // Update the cart's Medicine and TotalCost.
        cart.Medicine = updatedMedicine;

        // Save the updated cart object in your database
        await cart.save();

        res.status(200).send({ message: "All instances of Medicine removed from cart and TotalCost updated" });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

  module.exports ={
    viewCart,
    deleteItem
  }