import { Balance, Transaction } from "../types";

/** 収支の合計を計算する */
export function financeCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      acc.income += transaction.amount
    }
    else if (transaction.type === "expense") {
      acc.expense += transaction.amount
    }
    acc.balance = acc.income - acc.expense;

    return acc;
  }, { income: 0, expense: 0, balance: 0 })
}

/**
 * 日付ごとの収支を計算する
 * @param transactions 収支情報
 */
export function calculateDailyBalances(transactions: Transaction[]): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 }
    }

    if (transaction.type === "income") {
      acc[day].income += transaction.amount
    }
    else if (transaction.type === "expense") {
      acc[day].expense += transaction.amount
    }
    acc[day].balance = acc[day].income - acc[day].expense;

    return acc
  }, {})
}