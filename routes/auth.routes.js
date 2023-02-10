const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
    validateCreateUserMiddleWare,
} = require("../middlewares/auth.middleware");
const {
    signupController,
    loginController,
} = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/login", loginController);

authRouter.post(
    "/signup",
    validateCreateUserMiddleWare,
    passport.authenticate("signup", { session: false }),
    signupController
);

module.exports = authRouter;
