import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { logout } from "./userSlice";

const initialState = {
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload._id);
      if (product)
        product.quantity = +product.quantity + +action.payload.quantity;
      else state.products = [action.payload, ...state.products];
      state.totalPrice = state.products.reduce((acc, p) => {
        return acc + p.quantity * p.price;
      }, 0);
      Cookies.set("cart", JSON.stringify(state), { expires: 30 });
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.totalPrice = state.products.reduce((acc, p) => {
        return acc + p.quantity * p.price;
      }, 0);
      Cookies.set("cart", JSON.stringify(state), { expires: 30 });
    },
    clearCart: (state, action) => {
      Cookies.remove("cart");
      return initialState;
    },
    setCart: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: {
    [logout]: (state, action) => {
      Cookies.remove("cart");
      return initialState;
    },
  },
});

export const { addProduct, removeProduct, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
