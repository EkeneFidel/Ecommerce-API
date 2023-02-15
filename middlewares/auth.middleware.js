const passport = require("passport");
const userModel = require("../models/user.model");

const {
    jwtStrategy,
    loginStrategy,
    signupStrategy,
    adminLoginStrategy,
} = require("../strategies/auth.strategies");
const { createUserValidator } = require("../validators/user.validator");

passport.use(jwtStrategy);

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);
passport.use("admin-login", adminLoginStrategy);

const validateCreateUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body;
    try {
        await createUserValidator.validateAsync(userPayload);
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message.replace(/"|'/g, ""),
            success: false,
        });
    }
};

const isAdmin = async (req, res, next) => {
    const id = req.user._id;
    const user = await userModel.findOne({ id });
    if (user.role !== "admin") {
        return res.status(401).json({
            message: "You are not an admin user",
            success: false,
        });
    } else {
        next();
    }
};

module.exports = { validateCreateUserMiddleWare, isAdmin };
