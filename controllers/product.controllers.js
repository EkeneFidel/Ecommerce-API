const slugify = require("slugify");
const fs = require("fs");
const productModel = require("../models/product.model");
const cloudinaryUploadImg = require("../utils/cloudinary.utils");

const addProduct = async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await productModel.create(req.body).select(["-__v"]);
        return res.status(200).json({
            message: "Product added",
            success: true,
            product: newProduct,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await productModel.findById(id).select(["-__v"]);

        return res.status(200).json({
            success: true,
            product: product,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllProduct = async (req, res, next) => {
    try {
        const findQuery = {};
        const sortQuery = {};
        const { brand, category, price, sort_by, page, per_page } = req.query;

        if (brand) {
            findQuery.brand = brand;
        }
        if (category) {
            findQuery.category = category;
        }
        if (price) {
            var arr = price.split("-");
            const low = Number(arr[0]);
            const high = Number(arr[1]);

            findQuery.price = { $gte: low, $lte: high };
        }
        if (sort_by) {
            if (sort_by === "newest") {
                sortQuery["createdAt"] = -1;
            } else if (sort_by === "oldest") {
                sortQuery["createdAt"] = 1;
            } else if (sort_by === "highest-price") {
                sortQuery.price = -1;
            } else if (sort_by === "nelowest-priceest") {
                sortQuery.price = 1;
            }
        }

        const skip = (page - 1) * per_page;

        if (req.query.page) {
            const prodCount = await productModel.countDocuments();
            if (skip >= prodCount)
                return res.status(400).json({
                    success: false,
                    message: "This page does not exist",
                });
        }

        const products = await productModel
            .find(findQuery)
            .sort(sortQuery)
            .skip(skip)
            .select(["-__v"])
            .limit(per_page);

        return res.status(200).json({
            success: true,
            products: products,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const productData = req.body;

        const updatedUser = await productModel
            .findByIdAndUpdate(id, productData, { new: true })
            .select(["-__v"]);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedProduct = await productModel
            .findByIdAndDelete(id)
            .select(["-__v"]);

        return res.status(200).json({
            success: true,
            product: deletedProduct,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const uploadImages = async (req, res, next) => {
    try {
        const { id } = req.params;
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }

        const findProduct = await productModel.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file;
                }),
            },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            product: findProduct,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    uploadImages,
};
