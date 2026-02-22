import { createSlice } from "@reduxjs/toolkit";

const logInSlice = createSlice({
  name: "login",
  initialState: {
    value: false,
  },
  reducers: {
    isLoggedIn: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    // decremented: (state) => {
    //   state.value -= 1;
    // },
  },
});

export const { isLoggedIn } = counterSlice.actions;
