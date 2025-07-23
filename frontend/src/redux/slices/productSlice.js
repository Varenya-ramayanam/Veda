import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk: Fetch products with filters
export const fetchProducts = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collections,
    category,
    material,
    sizes,
    color,
    priceMin,
    priceMax,
    ratingMin,
    isFeatured,
    isNewArrival,
    ecoFriendly,
    sort,
    search,
    page,
    limit,
    tags,
    stockAvailability,
  }) => {
    const query = new URLSearchParams();

    if (collections) query.append("collections", collections);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (sizes && sizes.length > 0) {
      sizes.forEach((size) => query.append("sizes", size));
    }
    if (color) query.append("color", color);
    if (priceMin !== undefined) query.append("priceMin", priceMin);
    if (priceMax !== undefined) query.append("priceMax", priceMax);
    if (ratingMin !== undefined) query.append("ratingMin", ratingMin);
    if (isFeatured !== undefined) query.append("isFeatured", isFeatured);
    if (isNewArrival !== undefined) query.append("isNewArrival", isNewArrival);
    if (ecoFriendly !== undefined) query.append("ecoFriendly", ecoFriendly);
    if (sort) query.append("sort", sort);
    if (search) query.append("search", search);
    if (page !== undefined) query.append("page", page);
    if (limit !== undefined) query.append("limit", limit);
    if (tags && tags.length > 0) {
      tags.forEach((tag) => query.append("tags", tag));
    }
    if (stockAvailability) query.append("stockAvailability", stockAvailability);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );

    // Expecting { products: [...], total: number, page: number }
    return response.data;
  }
);

// Async Thunk: Fetch single product details
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// Initial State
const initialState = {
  products: [],
  product: null,
  total: 0,
  page: 1,
  loading: false,
  error: null,
};

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct(state) {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = []; // fallback to empty
      })

      // Fetch single product
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
