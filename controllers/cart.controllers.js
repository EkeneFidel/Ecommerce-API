const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");

const addItemstoCart = async (req, res, next) => {
    try {
        let { productId, quantity } = req.body;
        quantity = parseInt(quantity);
        const user = req.user;
        // first check if user has a cart
        const cartExists = await cartModel.findOne({ orderBy: user._id });
        const product = await productModel.findById({ _id: productId });
        if (!product) {
            return res.status(400).json({
                message: "Product not found",
                success: true,
            });
        } else {
            // If product is already in cart, check if product is in cart
            let newItem = {};
            let finalCart = {};
            if (cartExists) {
                const indexFound = cartExists.cartItems.findIndex(
                    (item) => item.product.toString() === productId
                );
                // if product is in cart, calculate qty, price, total qty and total price
                if (indexFound !== -1) {
                    cartExists.cartItems[indexFound].quantity += quantity;
                    cartExists.cartItems[indexFound].price +=
                        product.price * quantity;
                    cartExists.totalPrice = cartExists.cartItems.reduce(
                        (acc, n) => {
                            return acc + n.price;
                        },
                        0
                    );
                    cartExists.totalQuantity = cartExists.cartItems.reduce(
                        (acc, n) => {
                            return acc + n.quantity;
                        },
                        0
                    );
                    // if product is not in cart append to cart items
                } else {
                    newItem = {
                        product: productId,
                        quantity: quantity,
                        price: product.price * quantity,
                    };
                    cartExists.totalPrice += newItem.price;
                    cartExists.totalQuantity += newItem.quantity;
                    cartExists.cartItems.push(newItem);
                }
                finalCart = await (
                    await cartExists.save()
                ).populate("cartItems.product", "_id title price");
            } else {
                // if user does not have a cart, create one with cart item
                newItem = {
                    product: productId,
                    quantity: quantity,
                    price: product.price * quantity,
                };
                let cartObj = {
                    cartItems: [newItem],
                    totalQuantity: newItem.quantity,
                    totalPrice: newItem.price,
                    orderBy: user._id,
                };
                finalCart = await cartModel.create(cartObj);
                finalCart = await finalCart.populate(
                    "cartItems.product",
                    "_id title price"
                );
            }

            return res.status(200).json({
                success: true,
                cart: finalCart,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const getCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const cart = await cartModel.findOne({ orderBy: userId });
        if (!cart) {
            return res.json({
                success: true,
                cart: null,
            });
        } else {
            return res.status(200).json({
                success: true,
                cart: cart,
            });
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const removeItemFromCart = async (req, res, next) => {
    try {
        let { productId, quantity } = req.body;
        quantity = parseInt(quantity);
        const userId = req.user._id;

        const cart = await cartModel.findOne({ orderBy: userId });
        const product = await productModel.findById({ _id: productId });
        let finalCart = {};

        const index = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId
        );

        if (index !== -1) {
            if (cart.cartItems[index].quantity <= quantity) {
                cart.cartItems.splice(index, 1);

                if (cart.cartItems.length === 0) {
                    cart = await cartModel
                        .findOneAndDelete({
                            orderBy: userId,
                        })
                        .exec();
                } else {
                    if (cart.cartItems[index] !== undefined) {
                        cart.cartItems[index].quantity -= quantity;
                        cart.cartItems[index].price -= product.price * quantity;
                    }

                    cart.totalPrice = cart.cartItems.reduce((acc, n) => {
                        return acc + n.price;
                    }, 0);
                    cart.totalQuantity = cart.cartItems.reduce((acc, n) => {
                        return acc + n.quantity;
                    }, 0);
                    finalCart = await cart.save();
                }
            } else {
                cart.cartItems[index].quantity -= quantity;
                cart.cartItems[index].price -= product.price * quantity;
                cart.totalPrice = cart.cartItems.reduce((acc, n) => {
                    return acc + n.price;
                }, 0);
                cart.totalQuantity = cart.cartItems.reduce((acc, n) => {
                    return acc + n.quantity;
                }, 0);
                finalCart = await cart.save();
            }
        } else {
            return res.status(400).json({
                message: "Product is not in cart",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            cart: finalCart,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

const emptyCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const cart = await cartModel.findOneAndDelete({ orderBy: userId });
        return res.status(200).json({
            success: true,
            message: "Cart Deleted",
            cart: cart,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};

module.exports = {
    addItemstoCart,
    getCart,
    removeItemFromCart,
    emptyCart,
};
