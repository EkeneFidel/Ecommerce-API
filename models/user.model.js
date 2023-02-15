const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Define a schema
const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
        },
        provider: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: true,
            default: "user",
            enum: ["user", "admin"],
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
