const Joi = require("joi");

const createUserValidator = Joi.object()
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

const updateUserValidator = Joi.object().keys({
    firstname: Joi.string().label("First Name"),
    lastname: Joi.string().label("Last name"),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
});

module.exports = { createUserValidator, updateUserValidator };
