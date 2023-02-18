const express = require("express");
const passport = require("passport");

const {
    addCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
    addBrandToCategory,
} = require("../controllers/category.controllers");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/add", addCategory);
categoryRouter.post("/add-brand/:id", addBrandToCategory);
categoryRouter.put("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
