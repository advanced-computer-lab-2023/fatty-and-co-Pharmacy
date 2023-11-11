const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverAddressSchema = new Schema(
    {
        PatientUsername: {
            type: String,
            ref: "Patient",
            required: true,
            trim: true,
        },
        Street: {
            type: String,
            required: true,
        },
        Building: {
            type: String,
            required: true,
        },
        City: {
            type: String,
            required: true,
        },
        State: {
            type: String,
            required: true,
        },
        Country: {
            type: String,
            required: true,
        },
        PostalCode: {
            type: String,
            required: true,
        },
    }
);

const DeliveryAddress = mongoose.model("DeliveryAddress", deliverAddressSchema);
module.exports = DeliveryAddress;
