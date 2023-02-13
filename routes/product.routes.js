const express = require("express");

const {
    addProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controllers");

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.put("/:id", updateProduct);
productRouter.get("/:id", getProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/", getAllProduct);

module.exports = productRouter;
