const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const medicineModel = require("../models/medicine");

const addMedicineToCart = async (req, res) => {
    try {
        const Username = req.user.Username;
        const MedicineID = req.query.Medicine;
        console.log(MedicineID);
        const medicine = await medicineModel.findById(MedicineID);
        if (!medicine) {
            res.status(400).send({ message: "Medicine not found" });
        } else {
            const updatedTotalCost = cart.TotalCost + medicine.Price;
            const updatedMedicine = cart.Medicine.slice();
            updatedMedicine.push(MedicineID);
            const oldCart = await cartModel.findOneAndUpdate({ PatientUsername: Username, TotalCost: updatedTotalCost, Medicine: updatedMedicine });
            const newCart = await cartModel.findOne({ PatientUsername: Username });
            res.status(200).send(newCart);
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const incrementItemCount = async (req, res) => {
    try {
        const Username = req.user.Username;
        const MedicineID = req.query.Medicine;
        const medicine = await medicineModel.findById(MedicineID);
        if (!medicine) {
            res.status(400).send({ message: "Medicine not found" });
        }
        const cart = await cartModel.findOne({ PatientUsername: Username });
        const updatedTotalCost = cart.TotalCost + medicine.Price;
        const updatedMedicine = cart.Medicine.slice();
        updatedMedicine.push(MedicineID);
        const oldCart = await cartModel.findOneAndUpdate({ PatientUsername: Username, TotalCost: updatedTotalCost, Medicine: updatedMedicine });
        const newCart = await cartModel.findOne({ PatientUsername: Username });
        res.status(200).send(newCart);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const decrementItemCount = async (req, res) => {
    try {
        const Username = req.user.Username;
        const MedicineID = req.query.Medicine;
        const medicine = await medicineModel.findById(MedicineID);
        if (!medicine) {
            res.status(400).send({ message: "Medicine not found" });
        }
        const cart = await cartModel.findOne({ PatientUsername: Username });
        if (!cart) {
            return res.status(400).send({ message: "Cart not found" });
        }
        const medicineIndex = cart.Medicine.indexOf(MedicineID);
        if (medicineIndex === -1) {
            return res.status(400).send({ message: "Medicine not found in the cart" });
        }
        cart.Medicine.splice(medicineIndex, 1);
        cart.TotalCost -= medicine.Price;
        await cart.save();
        const newCart = await cartModel.findOne({ PatientUsername: Username });
        res.status(200).send(newCart);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = { addMedicineToCart, incrementItemCount, decrementItemCount };