const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define category schema
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brand",
            unique: true,
        },
    ],
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
