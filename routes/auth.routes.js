const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
    validateCreateUserMiddleWare,
} = require("../middlewares/auth.middleware");
const {
    signupController,
    loginController,
    adminLoginController,
} = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/admin-login", adminLoginController);

authRouter.post(
    "/signup",
    validateCreateUserMiddleWare,
    passport.authenticate("signup", { session: false }),
    signupController
);

module.exports = authRouter;
