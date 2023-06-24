import { configureStore } from "@reduxjs/toolkit";
import countOfProductReducer from "../features/countOfProducts/counterOfProductsSlice";
import walletSlice from "../features/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    countOfProducts: countOfProductReducer,
    wallet: walletSlice,
  },
});
