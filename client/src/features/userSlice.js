import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosConfig from "../axiosConfig";

const initialState = {
  _id: "",
  name: "",
  token: "",
};

let interceptor;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      Cookies.set("user", JSON.stringify(action.payload), { expires: 30 });
      axiosConfig.interceptors.request.eject(interceptor);
      interceptor = axiosConfig.interceptors.request.use(
        (config) => {
          localStorage.setItem("cookie", action.payload.token);
          config.headers["Authorization"] = `Bearer ${action.payload.token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
      return action.payload;
    },
    logout: (state) => {
      Cookies.remove("user");
      axiosConfig.interceptors.request.eject(interceptor);
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
