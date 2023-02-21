const express = require("express");
const passport = require("passport");

const { isAdmin } = require("../middlewares/auth.middleware");
const {
    createOrder,
    cancelOrder,
    updateOrderStatus,
    getOrder,
    getAllOrders,
} = require("../controllers/order.controllers");

const orderRouter = express.Router();

orderRouter.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    createOrder
);

orderRouter.post(
    "/cancel/:id",
    passport.authenticate("jwt", { session: false }),
    cancelOrder
);

orderRouter.patch(
    "/",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    updateOrderStatus
);

orderRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getOrder
);

orderRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    getAllOrders
);
module.exports = orderRouter;
