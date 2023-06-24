import { createSlice } from "@reduxjs/toolkit";

const initialState = parseInt(localStorage.getItem("wallet")) || 30000;

export const walletSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementWallet: (state, action) => {
      state += action.payload;
      localStorage.setItem("wallet", JSON.stringify(state));
      return state;
    },
    decrementWallet: (state, action) => {
      state -= action.payload;
      localStorage.setItem("wallet", JSON.stringify(state));
      return state;
    },
    setWallet: (state, action) => {
      state = action.payload;
      localStorage.setItem("wallet", JSON.stringify(state));

      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementWallet, decrementWallet, setWallet } =
  walletSlice.actions;

export default walletSlice.reducer;
