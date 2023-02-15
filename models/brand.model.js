const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define brand schema
const brandSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
});

const brandModel = mongoose.model("Brand", brandSchema);
module.exports = brandModel;
