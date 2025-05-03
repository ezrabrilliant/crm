import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get("/api/products");
  return res.data;
});

export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await axios.post("/api/products", product);
  return res.data;
});

export const updateProduct = createAsyncThunk("products/update", async (product) => {
  const res = await axios.patch(`/api/products/${product.id}`, product);
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`/api/products/${id}`);
  return id;
});

// Initial state
const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Failed to fetch products.";
      })

      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
