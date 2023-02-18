const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define product schema
const productSchema = new Schema(
    {
        title: {
            type: String,
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
            type: Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        images: [],
        quantity: {
            type: Number,
            required: true,
        },
        ratings: [
            {
                star: Number,
                postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            },
        ],
    },
    { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
