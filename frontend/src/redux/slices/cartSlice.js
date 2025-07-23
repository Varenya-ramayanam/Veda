import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get the token from localStorage
const loadCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Helper function to save the cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart items from user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCartItems",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add an item to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, userId, guestId, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          color,
          userId,
          guestId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update item quantity in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, userId, guestId, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          color,
          userId,
          guestId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId, guestId, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: { productId, color, userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Merge guest cart with user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {
          userId,
          guestId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// createSlice for cart management
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0, totalQuantity: 0 };
            saveCartToStorage(state.cart);
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        //addCase for adding to cart
       .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        })
        //addCase for updating cart item quantity
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity";
        })
        //addCase for removing from cart
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove from cart";
        })
        //addCase for merging cart
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(state.cart);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
        })
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;