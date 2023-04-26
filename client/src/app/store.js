import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import loadingReducer from "../features/loadingSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    loading: loadingReducer,
  },
});
