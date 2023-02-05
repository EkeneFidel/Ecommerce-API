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
        password: {
            type: String,
            required: true,
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

const validateUser = Joi.object()
    .keys({
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        confirmPassword: Joi.any()
            .equal(Joi.ref("password"))
            .label("Confirm Password")
            .messages({
                "any.only": "Confirm Password does not match Password",
            }),
        firstname: Joi.string().required().label("First Name"),
        lastname: Joi.string().required().label("Last name"),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        }),
    })
    .with("password", "confirmPassword");

const userModel = mongoose.model("Users", userSchema);
module.exports = { userModel, validateUser };
