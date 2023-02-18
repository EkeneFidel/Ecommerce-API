const express = require("express");
const passport = require("passport");

const { addItemstoCart } = require("../controllers/cart.controllers");

const cartRouter = express.Router();

cartRouter.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    addItemstoCart
);

module.exports = cartRouter;
