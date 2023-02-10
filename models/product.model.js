const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define product schema
const productSchema = new Schema(
    {
        firstname: {
            title: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            uniqu: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        quantity: {
            type: Number,
        },
        ratings: {
            star: Number,
            postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    },
    { timestamps: true }
);

const productModel = mongoose.model("Product", userSchema);
module.exports = productModel;
