import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Transaction } from "./types/index";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"
import { Schema } from "./validations/schema";
import { AppContextProvider } from "./components/AppContext";
import { isFireStoreError } from "./utils/errorHandling";

function App() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [isLoading, setIsLoading] = useState(true);

  // /** 取引をFirebaseに保存する処理 */
  // const handleSaveTransaction = async (transaction: Schema) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "Transactions"), transaction);
  //     console.log("Document written with ID: ", docRef.id);

  //     const newTransaction = {
  //       id: docRef.id,
  //       ...transaction,
  //     } as Transaction;

  //     setTransactions(prevTransaction =>
  //       [...prevTransaction,
  //         newTransaction
  //       ])
  //   } catch (error) {
  //     if (isFireStoreError(error)) {
  //       console.error("firebaseエラー:", error);
  //     } else {
  //       console.error("一般的なエラー:", error);
  //     }
  //   }
  // };

  // /** 取引をfirebaseから削除する処理 */
  // const handleDeleteTransaction = async (transactionIds: string | readonly string[]) => {
  //   try {
  //     const idsToDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds];
  //     for (const id of idsToDelete) {
  //       await deleteDoc(doc(db, "Transactions", id));
  //     }

  //     const filteredTransactions = transactions.filter((transaction) => !idsToDelete.includes(transaction.id));
  //     setTransactions(filteredTransactions);
  //   } catch (error) {
  //     if (isFireStoreError(error)) {
  //       console.error("firebaseエラー:", error);
  //     } else {
  //       console.error("一般的なエラー:", error);
  //     }
  //   }
  // }

  // /** firebaseの取引を更新する処理 */
  // const handleUpdateTransaction = async (transaction: Schema, transactionId: string) => {
  //   try {
  //     const docRef = doc(db, "Transactions", transactionId);
  //     await updateDoc(docRef, transaction);
  //     const updateTransactions = transactions.map((t) =>
  //       t.id === transactionId ? { ...t, ...transaction } : t
  //     ) as Transaction[];
  //     setTransactions(updateTransactions);
  //   } catch (error) {
  //     if (isFireStoreError(error)) {
  //       console.error("firebaseエラー:", error);
  //     } else {
  //       console.error("一般的なエラー:", error);
  //     }
  //   }
  // };

  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={
                <Home
                // monthlyTransactions={monthlyTransactions}
                // setCurrentMonth={setCurrentMonth}
                // onSaveTransaction={handleSaveTransaction}
                // onDeleteTransaction={handleDeleteTransaction}
                // onUpdateTransaction={handleUpdateTransaction}
                />} />
              <Route path="/report" element={
                <Report
                // currentMont={currentMonth}
                // setCurrentMonth={setCurrentMonth}
                // monthlyTransactions={monthlyTransactions}
                // isLoading={isLoading}
                // onDeleteTransaction={handleDeleteTransaction}
                />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
