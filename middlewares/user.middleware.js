const { updateUserValidator } = require("../validators/user.validator");

const validateUpdateUserMiddleWare = async (req, res, next) => {
    const userPayload = req.body;
    try {
        await updateUserValidator.validateAsync(userPayload);
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message.replace(/"|'/g, ""),
            success: false,
        });
    }
};

module.exports = { validateUpdateUserMiddleWare };
