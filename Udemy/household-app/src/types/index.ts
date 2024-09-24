export type TransactionType = "income" | "expense";
export type IncomeCategory = "給与" | "ボーナス" | "その他収入";
export type ExpenseCategory = "食費" | "日用品" | "住居費" | "交際費" | "娯楽" | "交通費" | "医療費";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory;
}