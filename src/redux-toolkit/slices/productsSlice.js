import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  status: "idle",
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProductsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productList = action.payload;
      })
      .addCase(getProductsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProductsList = createAsyncThunk(
  "getProductsList",
  async ({ limitProduct, currentPage }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API
      }/products?limit=${limitProduct}&page=${currentPage}`
    );
    const { data } = await response.json();
    return data;
  }
);
