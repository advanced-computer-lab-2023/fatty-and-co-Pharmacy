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
            return;
        }

        // Check that medicination type is over the counter
        if (medicine.MedicationType != "Over the counter") {
            res.status(400).send({ message: "Medicine has to be prescribed." });
            return;
        }

        const cart = await cartModel.findOne({ PatientUsername: Username });

        // Check availablity of the medicine.
        let inCart = 0;
        cart.Medicine.forEach((medicineId) => {
            if (medicineId == MedicineID) {
                inCart++;
            }
        });
        if (medicine.Quantity <= inCart) {
            res.status(400).send({ message: `Sorry, we only have ${medicine.Quantity} of ${medicine.Name} in stock.` });
            return;
        }
        if (!cart) {
            res.status(400).send({ message: "Cart not found" });
            return;
        }
        cart.TotalCost += medicine.Price;
        cart.Medicine.push(MedicineID);
        await cart.save();
        res.status(200).send(cart);
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
            res.status(400).send({ message: "Cart not found" });
            return;
        }
        const medicineIndex = cart.Medicine.indexOf(MedicineID);
        if (medicineIndex === -1) {
            res.status(400).send({ message: "Medicine not found in the cart" });
            return;
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
            res.status(404).send({ message: 'Cart not found for the user.' });
            return;
        }
        const medicineQuantityMap = new Map();

        cart.Medicine.forEach((medicineId) => {
            const stringMedicineId = medicineId.toString();
            if (medicineQuantityMap.has(stringMedicineId)) {
                medicineQuantityMap.set(stringMedicineId, medicineQuantityMap.get(stringMedicineId) + 1);
            } else {
                medicineQuantityMap.set(stringMedicineId, 1);
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