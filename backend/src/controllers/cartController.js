const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const medicineModel = require("../models/medicine");

const addMedicineToCart = async (req, res) => {
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
        cart.TotalCost += medicine.Price;
        cart.Medicine.push(MedicineID);
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

// Unnecessary - just use `addMedicineToCart()`

// const incrementItemCount = async (req, res) => {
//     try {
//         const Username = req.user.Username;
//         const MedicineID = req.query.Medicine;
//         const medicine = await medicineModel.findById(MedicineID);
//         if (!medicine) {
//             res.status(400).send({ message: "Medicine not found" });
//         }
//         const cart = await cartModel.findOne({ PatientUsername: Username });
//         if (!cart) {
//             return res.status(400).send({ message: "Cart not found" });
//         }
//         cart.Medicine.push(MedicineID);
//         cart.TotalCost += medicine.Price;
//         await cart.save();
//         res.status(200).send(cart);
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
// }


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
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const viewCart = async (req, res) => {
    const username = req.user.Username;
    try {
        const cart = await cartModel.findOne({ PatientUsername: username });
        if (!cart) {
            return res.status(404).send({ message: 'Cart not found for the user.' });
        }
        const medicineQuantityMap = new Map();

        cart.Medicine.forEach((medicineId) => {
            if (medicineQuantityMap.has(medicineId)) {
                medicineQuantityMap.set(medicineId, medicineQuantityMap.get(medicineId) + 1);
            } else {
                medicineQuantityMap.set(medicineId, 1);
            }
        });

        const medicine = await Promise.all(
            Array.from(medicineQuantityMap.keys()).map(async (medicineId) => {
                const medicine = await medicineModel.findById(medicineId);
                return {
                    id: medicine ? medicine._id : 'Unkown',
                    Name: medicine ? medicine.Name : 'Unknown',
                    Price: medicine ? medicine.Price : 0,
                    Quantity: medicineQuantityMap.get(medicineId),
                    TotalPrice: medicine ? (medicine.Price * medicineQuantityMap.get(medicineId)) : 0
                };
            })
        );

        res.status(200).send({ cart, medicine });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
};




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

        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    addMedicineToCart,
    decrementItemCount,
    viewCart,
    deleteItem
}