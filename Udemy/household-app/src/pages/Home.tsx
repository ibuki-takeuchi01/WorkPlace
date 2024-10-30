import { Box } from '@mui/material'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { Schema } from '../validations/schema'
import { DateClickArg } from '@fullcalendar/interaction'
import { useAppContext } from '../components/AppContext'
import useMonthlyTransactions from '../hooks/useMonthlyTransactions'


const Home = () => {
  const { isMobile } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /** 1日分のデータを取得する処理 */
  const dailyTransactions = useMemo(() => {
    return monthlyTransactions.filter(
      (transaction) => transaction.date === currentDay
    );
  }, [monthlyTransactions, currentDay])

  /** フォームの×ボタン押下時の処理 */
  const closeForm = () => {
    setSelectedTransaction(null);

    if (isMobile) {
      setIsDialogOpen(!isDialogOpen);
    } else {
      setIsEntryDrawerOpen(!isEntryDrawerOpen);
    }
  };

  /** フォームの開閉処理(内訳追加ボタンを押したとき) */
  const handleAddTransactionForm = () => {
    if (isMobile) {
      setIsDialogOpen(true);
    }
    else {
      if (selectedTransaction) {
        setSelectedTransaction(null);
      } else {
        setIsEntryDrawerOpen(!isEntryDrawerOpen);
      }
    }
  };

  /** 取引が選択された時の処理 */
  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    if (isMobile) {
      setIsDialogOpen(true)
    } else {
      setIsEntryDrawerOpen(true);
    }
  }

  /** モバイル用Drawerを閉じる処理  */
  const handleCloseMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  /**
 * 日付クリックイベント
 * @param dateInfo 日付クリックイベント
 */
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
    setIsMobileDrawerOpen(true);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary />
        <Calendar
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          onDateClick={handleDateClick}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onHandleAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
          open={isMobileDrawerOpen}
          onClose={handleCloseMobileDrawer}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Box>
    </Box>
  )
}

export default Home