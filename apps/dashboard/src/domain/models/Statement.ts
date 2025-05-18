import { Transaction } from "./Transaction";

export interface Statement {
  transactions: Transaction[];
  balance: number;
}
