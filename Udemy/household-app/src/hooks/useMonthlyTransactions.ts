import { useMemo } from 'react';
import { useAppContext } from '../components/AppContext';
import { Transaction } from '../types';
import { formatMonth } from '../utils/formatting';

const useMonthlyTransactions = (): Transaction[] => {
  const { transactions, currentMonth } = useAppContext();

  /** 1ヶ月分のデータのみ取得 */
  const monthlyTransactions = useMemo(() => {
    return transactions.filter((transaction) =>
      transaction.date.startsWith(formatMonth(currentMonth))
    )
  }, [transactions, currentMonth]);

  return monthlyTransactions;
};

export default useMonthlyTransactions