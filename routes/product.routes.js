const express = require("express");
const passport = require("passport");

const { isAdmin } = require("../middlewares/auth.middleware");
const {
    uploadPhoto,
    productImgResize,
} = require("../middlewares/uploadImages");
const {
    addProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    uploadImages,
} = require("../controllers/product.controllers");

const productRouter = express.Router();

productRouter.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    addProduct
);
productRouter.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    updateProduct
);
productRouter.get("/:id", getProduct);
productRouter.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    deleteProduct
);
productRouter.get("/", getAllProduct);
productRouter.put(
    "/upload/:id",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
);

module.exports = productRouter;
