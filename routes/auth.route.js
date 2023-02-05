const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models/user.model");
const { validateUserMiddleWare } = require("../middlewares/auth.middleware");
const {
    signupController,
    loginController,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.post(
    "/signup",
    validateUserMiddleWare,
    passport.authenticate("signup", { session: false }),
    signupController
);

module.exports = authRouter;
