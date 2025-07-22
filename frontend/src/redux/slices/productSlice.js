// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    {
      category,
      material,
      deity,
      availability,
      ecoFriendly,
      minPrice = 0,
      maxPrice = 100000,
      sortBy = "createdAt",
      order = "desc",
      rating = 0,
      page = 1,
      limit = 20,
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();

      category?.forEach((c) => params.append("category", c));
      material?.forEach((m) => params.append("material", m));
      deity?.forEach((d) => params.append("deity", d));
      availability?.forEach((a) => params.append("availability", a));
      if (ecoFriendly) params.set("ecoFriendly", "true");
      if (rating) params.set("rating", rating);
      params.set("minPrice", minPrice);
      params.set("maxPrice", maxPrice);
      params.set("sortBy", sortBy);
      params.set("order", order);
      params.set("page", page);
      params.set("limit", limit);

      const { data } = await axios.get(`/api/products?${params.toString()}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalProducts: 0,
    page: 1,
    limit: 20,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
