import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userAuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setUserNull: () => null,
  },
});

export const { setUser, setUserNull } = userAuthSlice.actions;

export default userAuthSlice.reducer;
