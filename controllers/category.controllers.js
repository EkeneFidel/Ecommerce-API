const brandModel = require("../models/brand.model");
const categoryModel = require("../models/category.model");

const addCategory = async (req, res, next) => {
    try {
        const title = req.body.title;
        const newCategory = await categoryModel.create({
            title: title,
        });
        return res.status(200).json({
            message: "Category added",
            success: true,
            category: newCategory,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const addBrandToCategory = async (req, res, next) => {
    try {
        const brands = req.body.brands;
        const id = req.params.id;
        const updatedCategory = await categoryModel
            .findByIdAndUpdate(
                id,
                { $addToSet: { brands: brands } },
                { new: true }
            )
            .select(["-__v"]);
        return res.status(200).json({
            message: "Brands added",
            success: true,
            category: updatedCategory,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.find().select(["-__v"]);

        return res.status(200).json({
            success: true,
            categories: categories,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const editCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const brands = req.body.brands;

        const updatedCategory = await categoryModel
            .findByIdAndUpdate(
                id,
                { title: title, brands: brands },
                { new: true }
            )
            .select(["-__v"]);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedCategory = await categoryModel
            .findByIdAndDelete(id)
            .select(["-__v"]);

        return res.status(200).json({
            success: true,
            category: deletedCategory,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    editCategory,
    deleteCategory,
    addBrandToCategory,
};
