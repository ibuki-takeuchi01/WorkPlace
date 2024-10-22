import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Transaction } from "./types/index";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase"
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {

  /** Firestoreがエラーかどうか判定する型ガード */
  function isFireStoreError(error: unknown): error is { code: string, message: string } {
    return typeof error === "object" && error !== null && "code" in error
  }
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMont, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  /** firebaseのデータをすべて取得 */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData);
      } catch (error) {
        if (isFireStoreError(error)) {
          console.error("firebaseエラー:", error);
        } else {
          console.error("一般的なエラー:", error);
        }
      } finally {
        setIsLoading(false);
        console.log(isLoading);
      }
    }
    fetchTransactions();
  }, [])

  /** 1ヶ月分のデータのみ取得 */
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMont));
  });

  /** 取引をFirebaseに保存する処理 */
  const handleSaveTransaction = async (transaction: Schema) => {
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
  const handleDeleteTransaction = async (transactionIds: string | readonly string[]) => {
    try {
      const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds];
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }

      // const filteredTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      // console.log(filteredTransactions);
      // setTransactions(filteredTransactions);
    } catch (error) {
      if (isFireStoreError(error)) {
        console.error("firebaseエラー:", error);
      } else {
        console.error("一般的なエラー:", error);
      }
    }
  }

  /** firebaseの取引を更新する処理 */
  const handleUpdateTransaction = async (transaction: Schema, transactionId: string) => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />} />
            <Route path="/report" element={
              <Report
                currentMont={currentMont}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                isLoading={isLoading}
                onDeleteTransaction={handleDeleteTransaction}
              />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
