import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetail: {},
  status: 'idle',
  error: null
}

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async ({ id }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API
      }/products/${id}`
    );
    const { data } = await response.json();
    return data;
  }
);
