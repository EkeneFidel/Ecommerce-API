const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define order schema
const orderSchema = new Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
                color: String,
            },
        ],
        paymentIntent: {},
        orderSatus: {
            type: String,
            default: "Not Processed",
            enum: [
                "Not Processed",
                "Cash On Delivery",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered",
            ],
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
