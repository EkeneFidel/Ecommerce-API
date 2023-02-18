const express = require("express");
const passport = require("passport");

const {
    addBrand,
    getAllBrands,
    editBrand,
    deleteBrand,
} = require("../controllers/brand.controllers");

const brandRouter = express.Router();

brandRouter.get("/", getAllBrands);
brandRouter.post("/add", addBrand);
brandRouter.put("/:id", editBrand);
brandRouter.delete("/:id", deleteBrand);

module.exports = brandRouter;
