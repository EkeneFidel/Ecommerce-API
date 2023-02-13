const express = require("express");

const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
} = require("../controllers/user.controllers");
const {
    validateUpdateUserMiddleWare,
} = require("../middlewares/user.middleware");

const userRouter = express.Router();

userRouter.get("/all-users", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", validateUpdateUserMiddleWare, updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
