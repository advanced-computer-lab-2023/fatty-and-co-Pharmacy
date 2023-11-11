const patientModel = require("../models/patients");
const orderModel = require("../models/orders");
const cartModel = require("../models/cart");
const deliveryAddressModel = require("../models/deliveryAddress");

const viewDeliveryAddresses = async (req, res) => {
    try {
        const username = req.user.Username;
        const deliveryAddresses = await deliveryAddressModel.find({ PatientUsername: username });
        res.status(200).send(deliveryAddresses);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const addDeliveryAddress = async (req, res) => {
    try {
        const username = req.user.Username;
        const street = req.query.Street;
        const building = req.query.Building;
        const city = req.query.City;
        const state = req.query.State;
        const country = req.query.Country;
        const postalCode = req.query.PostalCode;
        const deliveryAddress = await deliveryAddressModel.create({
            PatientUsername: username,
            Street: street,
            Building: building,
            City: city,
            State: state,
            Country: country,
            PostalCode: postalCode,
        });
        res.status(200).send(deliveryAddress);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    viewDeliveryAddresses,
    addDeliveryAddress,
}