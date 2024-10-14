import { Grid2, Paper } from '@mui/material'

const Report = () => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" }
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        日付
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Paper sx={commonPaperStyle}>
          カテゴリグラフ
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Paper sx={commonPaperStyle}>
          棒グラフ
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        テーブル
      </Grid2>
    </Grid2>
  )
}

export default Report