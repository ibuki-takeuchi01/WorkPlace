import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useTheme } from '@mui/material'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Legend, Tooltip, ChartData } from 'chart.js';
import { useState } from 'react';
import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from '../types';
import { useAppContext } from './AppContext';
import useMonthlyTransactions from '../hooks/useMonthlyTransactions';

ChartJs.register(
  ArcElement,
  Tooltip,
  Legend
);

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean
}

/** 円グラフ */
const CategoryChart = (
  // { monthlyTransactions, isLoading }: CategoryChartProps
) => {
  const { isLoading } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  const handleChange = (e: SelectChangeEvent<TransactionType>) => {
    setSelectedType(e.target.value as TransactionType);
  }

  /** カテゴリ毎の合計金額を計算する処理 */
  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const incomeCategoryColor: Record<IncomeCategory, string> = {
    "給与": theme.palette.incomeCategoryColor.給与,
    "ボーナス": theme.palette.incomeCategoryColor.ボーナス,
    "その他収入": theme.palette.incomeCategoryColor.その他収入,
  };

  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    "食費": theme.palette.expenseCategoryColor.食費,
    "日用品": theme.palette.expenseCategoryColor.日用品,
    "住居費": theme.palette.expenseCategoryColor.住居費,
    "交際費": theme.palette.expenseCategoryColor.交際費,
    "娯楽": theme.palette.expenseCategoryColor.娯楽,
    "交通費": theme.palette.expenseCategoryColor.交通費,
    "医療費": theme.palette.expenseCategoryColor.医療費,
  };

  const getCategoryColor = (category: IncomeCategory | ExpenseCategory): string => {
    if (selectedType === "income") {
      return incomeCategoryColor[category as IncomeCategory];
    }
    else {
      return expenseCategoryColor[category as ExpenseCategory]
    }
  }

  const data: ChartData<"pie"> = {
    // x 軸のラベル
    labels: categoryLabels,
    datasets: [
      {
        // データの値
        data: categoryValues,
        // グラフの背景色
        backgroundColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        // グラフの枠線の色
        borderColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          label="収支の種類"
          value={selectedType}
          onChange={handleChange}
        >
          <MenuItem value={"income"}>収入</MenuItem>
          <MenuItem value={"expense"}>支出</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : monthlyTransactions.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <Typography>データがありません</Typography>
        )}
      </Box>
    </>
  )
}

export default CategoryChart