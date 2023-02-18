const brandModel = require("../models/brand.model");

const addBrand = async (req, res, next) => {
    try {
        const title = req.body.title;
        const newBrand = await brandModel.create({ title: title });
        return res.status(200).json({
            message: "Brand added",
            success: true,
            brand: newBrand,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const getAllBrands = async (req, res, next) => {
    try {
        const brands = await brandModel.find().select(["-__v"]);

        return res.status(200).json({
            success: true,
            brands: brands,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const editBrand = async (req, res, next) => {
    try {
        const id = req.params.id;
        const title = req.body.title;

        const updatedBrand = await brandModel
            .findByIdAndUpdate(id, { title: title }, { new: true })
            .select(["-__v"]);
        return res.status(200).json({
            success: true,
            message: "Brand updated successfully",
            brand: updatedBrand,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteBrand = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBrand = await brandModel
            .findByIdAndDelete(id)
            .select(["-__v"]);

        return res.status(200).json({
            success: true,
            brand: deletedBrand,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addBrand,
    getAllBrands,
    editBrand,
    deleteBrand,
};
