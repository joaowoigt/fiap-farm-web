import { createSelector, createSlice } from "@reduxjs/toolkit";
import { setupPagination } from "../../utils/paginations";
import { handleFilter } from "../../utils/filter";
import { Transaction } from "../../../domain/models/Transaction";

export interface TransactionState {
  transactions: Transaction[];
  filteredList: Transaction[];
  filter: string;
  pagination: {
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

const initialState: TransactionState = {
  transactions: [],
  filteredList: [],
  filter: "All",
  pagination: {
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 3,
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    setExtract(state) {
      // pagination setup
      const transactions: Transaction[] = state.transactions;
      const pageList: Transaction[] = setupPagination(state);

      // return filtered list
      (state.filteredList as Transaction[]) = handleFilter(
        state,
        pageList,
        transactions
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const { setTransactions, setExtract, setFilter, setCurrentPage } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
