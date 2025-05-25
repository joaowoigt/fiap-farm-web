import { configureStore } from "@reduxjs/toolkit";
import transactions from "../features/transactions/transactionsSlices";
import centerArea from "../features/balance/CenterAreaSlice";
import user from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    user,
    transactions,
    centerArea,
  },
});

export default store;
