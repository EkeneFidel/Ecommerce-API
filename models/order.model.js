const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { date } = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define order schema
const orderSchema = new Schema(
    {
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                price: { type: Number },
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
        totalPrice: {
            type: Number,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        dateOrdered: {
            type: Date,
            default: date.now(),
        },
    },
    { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
