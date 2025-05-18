import { Transaction } from "../../domain/models/Transaction";
import { TransactionState } from "../features/transactions/transactionsSlices";

export function handleFilter(
  state: TransactionState,
  pageList: Transaction[],
  allTransactions: Transaction[]
) {
  const filter = state.filter;
  if (filter === "All") {
    return pageList;
  } else {
    return allTransactions.filter(
      (transaction: Transaction) => transaction.type === filter
    );
  }
}
