const passport = require("passport");

const {
    jwtStrategy,
    loginStrategy,
    signupStrategy,
} = require("../strategies/auth.strategies");
const { validateUser } = require("../models/user.model");

passport.use(jwtStrategy);

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);

const validateUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body;
    try {
        await validateUser.validateAsync(userPayload);
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message.replace(/"|'/g, ""),
            success: false,
        });
    }
};

module.exports = { validateUserMiddleWare };
