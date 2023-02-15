const userModel = require("../models/user.model");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find().select(["-__v", "-password"]);

        return res.status(200).json({
            success: true,
            users: users,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id).select(["-__v", "-password"]);

        return res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        const user = await userModel.findById(id);

        if (user) {
            const updatedUser = await userModel
                .findByIdAndUpdate(id, userData, { new: true })
                .select(["-__v", "-password"]);
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: updatedUser,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);

        if (user) {
            const deletedUser = await userModel
                .findByIdAndDelete(id)
                .select(["-__v", "-password"]);
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user: deletedUser,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const changePassword = async (req, res, next) => {
    try {
        const id = req.user._id;
        let user = await userModel.findById(id);
        const { oldPassword, newPassword } = req.body;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const validate = await user.isValidPassword(oldPassword);
        if (!validate) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect",
            });
        }
        if (newPassword) {
            user.password = newPassword;
            const updatedPassword = await user.save();
            return res.status(200).json({
                success: true,
                message: "Password updated",
                user: updatedPassword,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "New password not provided",
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    changePassword,
};
