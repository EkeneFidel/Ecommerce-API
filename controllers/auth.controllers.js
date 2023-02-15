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
                return res.status(info.status).json({
                    message: info.message,
                    success: false,
                });
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };

                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });

                return res
                    .json({
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        token,
                        success: true,
                    })
                    .status(info.status);
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

const adminLoginController = async (req, res, next) => {
    passport.authenticate("admin-login", async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(info.status).json({
                    message: info.message,
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
    adminLoginController,
};
