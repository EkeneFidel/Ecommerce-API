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

        // If product is already in cart, check if product is in cart
        let newItem = {};
        let finalCart = null;
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
            finalCart = await finalCart
                .populate("cartItems.product", "_id title price")
                .execPopulate();
        }

        return res.status(200).json({
            success: true,
            cart: finalCart,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            success: true,
        });
    }
};
module.exports = {
    addItemstoCart,
};
