import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("Counts")) || {};

export const countOfProductsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementProduct: (state, action) => {
      const productId = action.payload;
      if (state[productId]) {
        state[productId] = state[productId] + 1;
      } else {
        state[productId] = 1;
      }
      localStorage.setItem("Counts", JSON.stringify(state));
    },
    decrementProduct: (state, action) => {
      const productId = action.payload;
      state[productId] = state[productId] - 1;
      if (state[productId] === 0) {
        delete state[productId];
      }
      localStorage.setItem("Counts", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementProduct, decrementProduct } =
  countOfProductsSlice.actions;

export default countOfProductsSlice.reducer;
