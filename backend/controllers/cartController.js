const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// ✅ Utility function to find cart
const findCart = async (userId, guestId) => {
  if (userId) return await Cart.findOne({ userId });
  if (guestId) return await Cart.findOne({ guestId });
  return null;
};

// ✅ Add product to cart
const addProductToCart = async (req, res) => {
  const { productId, quantity, color, guestId, userId } = req.body;
//   console.log("Adding product to cart:", { productId, quantity, color, guestId, userId });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const image = product.image?.[0]?.url || ""; // ✅ Get first image URL or empty
    const qty = parseInt(quantity) || 1;

    let cart = await findCart(userId, guestId);

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        guestId,
        products: [
          {
            productId,
            name: product.name,
            price: product.price,
            quantity: qty,
            color,
            image,
          },
        ],
      });
    } else {
      // Existing cart
      const index = cart.products.findIndex(
        (item) =>
          item.productId.toString() === productId.toString() && item.color === color
      );

      if (index !== -1) {
        cart.products[index].quantity += qty;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          price: product.price,
          quantity: qty,
          color,
          image,
        });
      }
    }

    cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update quantity of item in cart
const updateProductQuantity = async (req, res) => {
  const { productId, quantity, color, guestId, userId } = req.body;

  try {
    const cart = await findCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const cartItemIndex = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() && item.color === color
    );

    if (cartItemIndex !== -1) {
      cart.products[cartItemIndex].quantity = quantity;

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Remove product from cart
const deleteProductFromCart = async (req, res) => {
  const { productId, color, guestId, userId } = req.body;

  try {
    const cart = await findCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.products.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() && item.color === color
    );

    if (index !== -1) {
      cart.products.splice(index, 1);

      cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
      cart.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get cart
const getUserCart = async (req, res) => {
  const { guestId, userId } = req.query;

  try {
    const cart = await findCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Merge guest cart with user cart on login
const mergeCart = async (req, res) => {
  const { guestId, userId } = req.body;

  try {
    const guestCart = await findCart(null, guestId);
    const userCart = await findCart(userId, null);

    if (!guestCart || guestCart.products.length === 0) {
      return res.status(200).json({ message: "Nothing to merge" });
    }

    if (userCart) {
      guestCart.products.forEach((item) => {
        const existing = userCart.products.find(
          (userItem) =>
            userItem.productId.toString() === item.productId.toString() &&
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

      return res.status(200).json(userCart);
    } else {
      guestCart.userId = userId;
      guestCart.guestId = null;
      await guestCart.save();

      return res.status(200).json(guestCart);
    }
  } catch (error) {
    console.error("Error merging cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
  getUserCart,
  mergeCart,
};
