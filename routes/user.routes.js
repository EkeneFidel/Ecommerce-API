const express = require("express");
const passport = require("passport");

const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    changePassword,
} = require("../controllers/user.controllers");
const {
    validateUpdateUserMiddleWare,
} = require("../middlewares/user.middleware");
const { isAdmin } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    getAllUsers
);
userRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getUser
);
userRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    validateUpdateUserMiddleWare,
    updateUser
);
userRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteUser
);
userRouter.put(
    "/password/change",
    passport.authenticate("jwt", { session: false }),
    changePassword
);

module.exports = userRouter;
