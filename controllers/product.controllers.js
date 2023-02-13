const slugify = require("slugify");
const productModel = require("../models/product.model");

const addProduct = async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await productModel.create(req.body);
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
        const product = await productModel.findById(id);

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
        const queryObj = { ...req.query };
        const findQuery = {};
        const sortQuery = {};
        const { brand, category, price, sort_by, page, per_page } = req.query;
        const exclude_fields = ["page", "per_page", "price"];
        exclude_fields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);

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

        const products = await productModel
            .find(findQuery)
            .sort(sortQuery)
            .skip(page)
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

        const updatedUser = await productModel.findByIdAndUpdate(
            id,
            productData,
            { new: true }
        );
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
        const deletedProduct = await productModel.findByIdAndDelete(id);

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

module.exports = {
    addProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
};
