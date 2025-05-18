import { Transaction } from "../../domain/models/Transaction";
import { TransactionState } from "../features/transactions/transactionsSlices";

export function setupPagination(state: TransactionState): Transaction[] {
  const transactions: Transaction[] = state.transactions;
  const currentPage = state.pagination.currentPage;
  const itemsPerPage = state.pagination.itemsPerPage;
  state.pagination.totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;

  const pageList = transactions.slice(startIndex, lastIndex);

  return pageList;
}
