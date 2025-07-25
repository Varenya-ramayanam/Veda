import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch products with filters
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
    if (sizes?.length) sizes.forEach((size) => query.append("sizes", size));
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
    if (tags?.length) tags.forEach((tag) => query.append("tags", tag));
    if (stockAvailability)
      query.append("stockAvailability", stockAvailability);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );

    return response.data; // { products, total, page }
  }
);

// ✅ Fetch single product details
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const token = localStorage.getItem("userToken");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      config
    );
    return response.data;
  }
);

// ✅ Fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const token = localStorage.getItem("userToken");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
      config
    );
    return { products: response.data || [] };
  }
);

// ✅ Initial State
const initialState = {
  products: [],
  selectedProduct: null,
  total: 0,
  page: 1,
  loading: false,
  error: null,
  similarProducts: [],
  similarLoading: false,
};

// ✅ Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct(state) {
      state.selectedProduct = null;
      state.similarProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ All Products
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
        state.error = action.error.message || "Failed to fetch products";
        state.products = [];
      })

      // ✅ Single Product
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      })

      // ✅ Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.similarLoading = true;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similarProducts = action.payload.products || [];
      })
      .addCase(fetchSimilarProducts.rejected, (state) => {
        state.similarLoading = false;
        state.similarProducts = [];
      });
  },
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
