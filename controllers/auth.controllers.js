const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const loginController = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error("Invalid credentials");
                return res.status(500).json({
                    message: error.message,
                    success: false,
                });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });

                return res.json({
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    token,
                    success: true,
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

const signupController = async (req, res, next) => {
    if (req.user.user) {
        return res.status(req.user.status).json({
            message: req.user["message"],
            success: req.user.success,
            user: req.user.user,
        });
    } else {
        return res.status(req.user.status).json({
            message: req.user["message"],
            success: req.user.success,
        });
    }
};

module.exports = {
    signupController,
    loginController,
};
