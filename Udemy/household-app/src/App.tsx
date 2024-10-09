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
import { addDoc, collection, getDocs } from "firebase/firestore";
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
              />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
