import { Grid2, Paper } from '@mui/material'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'

const Report = () => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <MonthSelector />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          <CategoryChart />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}>
          <BarChart />
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <TransactionTable />
      </Grid2>
    </Grid2>
  )
}

export default Report