import { Grid2, Paper } from '@mui/material'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { Transaction } from '../types'

interface ReportProps {
  currentMont: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const Report = ({ currentMont, setCurrentMonth, monthlyTransactions, isLoading }: ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 2,
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <MonthSelector
          currentMont={currentMont}
          setCurrentMonth={setCurrentMonth}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}>
          <BarChart
            monthlyTransactions={monthlyTransactions}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TransactionTable
          monthlyTransactions={monthlyTransactions}
        />
      </Grid2>
    </Grid2>
  )
}

export default Report