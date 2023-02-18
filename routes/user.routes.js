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

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", validateUpdateUserMiddleWare, updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put(
    "/password/change",
    passport.authenticate("jwt", { session: false }),
    changePassword
);

module.exports = userRouter;
