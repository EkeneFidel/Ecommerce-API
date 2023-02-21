const orderModel = require("../models/order.model");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

require("dotenv").config();

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { shippingAddress, phone } = req.body;
        const { address, city, postalCode, country } = shippingAddress;
        if (!address || !city || !postalCode || !country) {
            return res.status(400).json({
                message: "Fields Required",
                success: false,
            });
        }
        const cart = await cartModel.findOne({ orderBy: userId });
        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart not found",
                success: false,
            });
        } else {
            const order = await orderModel.create({
                orderItems: cart.cartItems,
                totalPrice: cart.totalPrice,
                shippingAddress: shippingAddress,
                phone: phone,
                orderBy: userId,
            });

            for (const item of cart.cartItems) {
                const id = item.product;
                const cartQuantity = item.quantity;
                const product = await productModel.findById(id);
                const quantity = product.quantity - cartQuantity;
                await productModel.findByIdAndUpdate(id, { quantity });
            }

            await cartModel.findOneAndDelete({ orderBy: userId });

            return res.status(200).json({
                success: true,
                message: "Order Created",
                order: order,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const cancelOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({
                success: true,
                message: "Order not found",
            });
        } else {
            for (const item of order.orderItems) {
                const product = await productModel.findById(item.product);

                if (!product) {
                    return res.status(400).json({
                        success: false,
                        message: "No product found",
                    });
                }

                await productModel.findByIdAndUpdate(item.product, {
                    quantity: product.quantity + item.quantity,
                });
            }

            order.orderSatus = "Cancelled";
            order.save();
            return res.status(200).json({
                success: true,
                order: order,
                message: "Order cancelled",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const status = req.body.status;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status missing",
            });
        }
        if (
            ![
                "Not Processed",
                "Processing",
                "Dispatched",
                "Cancelled",
                "Delivered",
            ].includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid Status",
            });
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found",
            });
        } else {
            order.orderSatus = status;
            order.save();
            return res.status(200).json({
                success: true,
                order: order,
                message: "Order status updated",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found",
            });
        } else {
            return res.status(200).json({
                success: true,
                order: order,
                message: "Order found",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const order = await orderModel.find({ orderBy: userId });
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Orders not found",
            });
        } else {
            return res.status(200).json({
                success: true,
                order: order,
                message: "Orders found",
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = {
    cancelOrder,
    createOrder,
    updateOrderStatus,
    getOrder,
    getAllOrders,
};
