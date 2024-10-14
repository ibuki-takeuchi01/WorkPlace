import { Box, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addMonths } from 'date-fns';
import { ja } from "date-fns/locale"

interface MonthSelectorProps {
  currentMont: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({ currentMont, setCurrentMonth }: MonthSelectorProps) => {
  /** 先月ボタン押下時の処理 */
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMont, -1);
    setCurrentMonth(previousMonth);
  }

  /** 次月ボタン押下時の処理 */
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMont, 1);
    setCurrentMonth(nextMonth);
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button onClick={handlePreviousMonth} color={"error"} variant='contained'>先月</Button>
        <DatePicker
          label="年月を選択"
          value={currentMont}
          sx={{ mx: 2, background: "white" }}
          views={["year", "month"]}
          format='yyyy/MM'
          slotProps={{ calendarHeader: { format: 'yyyy年MM月' } }}
        />
        <Button onClick={handleNextMonth} color={"primary"} variant='contained'>次月</Button>
      </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector