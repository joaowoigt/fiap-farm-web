import { configureStore } from "@reduxjs/toolkit";
import transactions from "../features/transactions/transactionsSlices";
import centerArea from "../features/balance/CenterAreaSlice";

const store = configureStore({
  reducer: {
    transactions,
    centerArea,
  },
});

export default store;
