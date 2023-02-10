const passport = require("passport");

const {
    jwtStrategy,
    loginStrategy,
    signupStrategy,
} = require("../strategies/auth.strategies");
const { createUserValidator } = require("../validators/user.validator");

passport.use(jwtStrategy);

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);

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

module.exports = { validateCreateUserMiddleWare };
