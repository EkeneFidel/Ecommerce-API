const express = require("express");
const passport = require("passport");

const {
    addItemstoCart,
    getCart,
    removeItemFromCart,
    emptyCart,
} = require("../controllers/cart.controllers");

const cartRouter = express.Router();

cartRouter.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    addItemstoCart
);

cartRouter.get("/", passport.authenticate("jwt", { session: false }), getCart);
cartRouter.post(
    "/remove",
    passport.authenticate("jwt", { session: false }),
    removeItemFromCart
);
cartRouter.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    emptyCart
);

module.exports = cartRouter;
