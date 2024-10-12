import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './slices/productsSlice'
import { productDetailSlice } from './slices/productDetailSlice'
import { cartSlice } from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartSlice.reducer
  },
})