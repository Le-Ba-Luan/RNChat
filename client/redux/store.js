import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./User/userAuthSlice";

const store = configureStore({
  reducer: {
    user: userAuthSlice,
  },
});

export default store;
