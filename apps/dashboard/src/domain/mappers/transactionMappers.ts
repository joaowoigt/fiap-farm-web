import { Transaction } from "../models/Transaction";

export function mapTransactionDBToTransactionResponse(
  transactionDB: any
): Transaction {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const formattedValue = formatter.format(transactionDB.value);

  return {
    id: transactionDB.id,
    accountId: transactionDB.accountId,
    month: getMonthName(transactionDB.date),
    type: getNameForScreen(transactionDB.type),
    fullDate: getFullDate(transactionDB.date),
    value: formattedValue,
    valueNumber: transactionDB.value,
    date: transactionDB.date,
  };
}

function getFullDate(apiDate: string): string {
  const convertedDate = new Date(apiDate);
  const month = convertedDate.getMonth() + 1;
  const year = convertedDate.getFullYear();
  const date = convertedDate.getDate();
  return `${date}/${month}/${year}`;
}

function getMonthName(apiDate: string): string {
  const convertedDate = new Date(apiDate);
  const month = convertedDate.toLocaleString("default", { month: "long" });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

function getNameForScreen(type: string): string {
  switch (type) {
    case "Credit":
      return "Crédito";
    case "Débit":
      return "Débito";
    default:
      return "Débito";
  }
}
