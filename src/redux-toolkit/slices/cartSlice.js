import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartProduct")) || [],
  quantity: JSON.parse(localStorage.getItem("cartProduct"))?.reduce((total, product) => total + product.quantityNew, 0) || 0,
  totalPrice: JSON.parse(localStorage.getItem("cartProduct"))?.reduce((total, product) => total + (product.price * product.quantityNew), 0) || 0,
  status: 'idle',
  error: null
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.cart.find(prod => prod._id === action.payload._id)

      if (existingProduct) {
        if (existingProduct.quantity > 0) {
          existingProduct.quantityNew += 1
          existingProduct.quantity -= 1
        }
      } else {
        const newProduct = {
          ...action.payload,
          quantityNew: 1
        }
        state.cart.push(newProduct)
      }

      state.quantity = state.cart.reduce(
        (total, product) => total + product.quantityNew,
        0
      );

      state.totalPrice = state.cart.reduce((total, product) => total + (product.price * product.quantityNew), 0)

      localStorage.setItem("cartProduct", JSON.stringify(state.cart))
    },
    decreaseProduct: (state, action) => {
      const existingProduct = state.cart.find(prod => prod._id === action.payload._id)

      if (existingProduct) {
        if (existingProduct.quantityNew > 1) {
          existingProduct.quantityNew -= 1;
          existingProduct.quantity += 1
        } else {
          existingProduct.quantity += 1
          state.cart = state.cart.filter((item) => item._id !== action.payload._id)
        }
      }

      state.quantity = state.cart.reduce(
        (total, product) => total + product.quantityNew,
        0
      );

      state.totalPrice = state.cart.reduce((total, product) => total + (product.price * product.quantityNew), 0)

      localStorage.setItem("cartProduct", JSON.stringify(state.cartProduct));
    },
    removeProduct: (state, action) => {
      const existingProduct = state.cart.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += existingProduct.quantityNew;
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
      }

      localStorage.setItem("cartProduct", JSON.stringify(state.cartProduct));
      state.quantity = state.cart.reduce(
        (total, product) => total + product.quantityNew,
        0
      );

      state.totalPrice = state.cart.reduce((total, product) => total + (product.price * product.quantityNew), 0)
    },
    clearCart: (state) => {
      state.cart = [];
      state.quantity = 0;
      localStorage.removeItem("cartProduct");
    }
  },
  extraReducers: () => { },
});

export const { addProduct, decreaseProduct, removeProduct, clearCart } = cartSlice.actions