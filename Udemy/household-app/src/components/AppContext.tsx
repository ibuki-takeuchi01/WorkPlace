import { createContext, ReactNode, useContext, useState } from "react";
import { Transaction } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Schema } from "../validations/schema";
import { db } from "../firebase";
import { isFireStoreError } from "../utils/errorHandling";

interface AppContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  onDeleteTransaction: (transactionIds: string | readonly string[]) => Promise<void>;
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  /** 取引をFirebaseに保存する処理 */
  const onSaveTransaction = async (transaction: Schema) => {
    try {
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;

      setTransactions(prevTransaction =>
        [...prevTransaction,
          newTransaction
        ])
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("firebaseエラー:", error);
      } else {
        console.error("一般的なエラー:", error);
      }
    }
  };

  /** 取引をfirebaseから削除する処理 */
  const onDeleteTransaction = async (transactionIds: string | readonly string[]) => {
    try {
      const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds];
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }

      const filteredTransactions = transactions.filter((transaction) => !idsToDelete.includes(transaction.id));
      setTransactions(filteredTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("firebaseエラー:", error);
      } else {
        console.error("一般的なエラー:", error);
      }
    }
  }

  /** firebaseの取引を更新する処理 */
  const onUpdateTransaction = async (transaction: Schema, transactionId: string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      const updateTransactions = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updateTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("firebaseエラー:", error);
      } else {
        console.error("一般的なエラー:", error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        currentMonth,
        setCurrentMonth,
        isLoading,
        setIsLoading,
        isMobile,
        onSaveTransaction,
        onDeleteTransaction,
        onUpdateTransaction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("グローバルなデータはプロバイダーの中で取得してください。");
  }

  return context;
}