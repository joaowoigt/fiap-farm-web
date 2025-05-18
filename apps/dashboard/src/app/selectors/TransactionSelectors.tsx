import { createSelector } from "@reduxjs/toolkit";
import { Transaction } from "../../domain/models/Transaction";

export const selectCreditValue = createSelector(
  (state) => state.transactions.transactions,
  (transactions) => {
    const debitList = transactions.filter(
      (transaction: Transaction) => transaction.type === "Crédito"
    );
    return debitList.reduce((acc: number, item: Transaction) => {
      return acc + item.valueNumber;
    }, 0);
  }
);

export const selectDebitValue = createSelector(
  (state) => state.transactions.transactions,
  (transactions) => {
    const debitList = transactions.filter(
      (transaction: Transaction) => transaction.type === "Débito"
    );
    return debitList.reduce((acc: number, item: Transaction) => {
      return acc + item.valueNumber;
    }, 0);
  }
);
