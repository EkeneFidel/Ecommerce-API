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
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        phone: {
            type: Number,
            required: true,
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        dateOrdered: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
