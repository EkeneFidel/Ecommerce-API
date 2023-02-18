const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { date } = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define cart schema
const cartSchema = new Schema(
    {
        cartItems: [
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
        totalPrice: {
            type: Number,
        },
        totalQuantity: {
            type: Number,
        },
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
