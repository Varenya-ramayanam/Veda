const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ✅ Utility function: get cart for user or guest
const findCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

const addProductToCart = async (req, res) => {
    const { productId, quantity, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await findCart(userId, guestId);

        if (cart) {
            const cartItemIndex = cart.products.findIndex(
                item => item.productId.toString() === productId.toString() &&
                         item.color === color
            );

            if (cartItemIndex !== -1) {
                cart.products[cartItemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, name: product.name, price: product.price, quantity, color });
            }
        } else {
            cart = new Cart({
                userId,
                guestId,
                products: [{ productId, name: product.name, price: product.price, quantity, color }]
            });
        }

        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);

        await cart.save();
        return res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProductQuantity = async (req, res) => {
    const { productId, quantity,  color, guestId, userId } = req.body;
    try {
        const cart = await findCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const cartItemIndex = cart.products.findIndex(
            item => item.productId.toString() === productId.toString() &&
                     item.color === color
        );

        if (cartItemIndex !== -1) {
            cart.products[cartItemIndex].quantity = quantity;
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
            await cart.save();
            return res.status(200).json({ message: "Product quantity updated", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteProductFromCart = async (req, res) => {
    const { productId, color, guestId, userId } = req.body;
    try {
        const cart = await findCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const cartItemIndex = cart.products.findIndex(
            item => item.productId.toString() === productId.toString() &&
                     item.color === color
        );

        if (cartItemIndex !== -1) {
            cart.products.splice(cartItemIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
            await cart.save();
            return res.status(200).json({ message: "Product deleted from cart", cart });
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Renamed to avoid conflict with findCart()
const getUserCart = async (req, res) => {
    const { guestId, userId } = req.query;
    try {
        const cart = await findCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        return res.status(200).json({ message: "Cart found", cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const mergeCart = async (req, res) => {
    const { guestId, userId } = req.body;
    try {
        const guestCart = await findCart(null, guestId);
        const userCart = await findCart(userId, null);

        if (!guestCart || guestCart.products.length === 0) {
            return res.status(200).json({ message: "Nothing to merge, guest cart is empty or not found" });
        }

        if (userCart) {
            guestCart.products.forEach(item => {
                const existing = userCart.products.find(
                    userItem => userItem.productId.toString() === item.productId.toString() &&
                                 userItem.color === item.color
                );
                if (existing) {
                    existing.quantity += item.quantity;
                } else {
                    userCart.products.push(item);
                }
            });

            userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            userCart.totalQuantity = userCart.products.reduce((acc, item) => acc + item.quantity, 0);

            await userCart.save();
            await Cart.findByIdAndDelete(guestCart._id);

            return res.status(200).json({ message: "Cart merged", cart: userCart });
        } else {
            guestCart.userId = req.user._id;
            guestCart.guestId = null;
            await guestCart.save();
            return res.status(200).json({ message: "Cart merged", cart: guestCart });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addProductToCart,
    updateProductQuantity,
    deleteProductFromCart,
    getUserCart,
    mergeCart
};
