import { Box, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addMonths } from 'date-fns';
import { ja } from "date-fns/locale"
import { useAppContext } from './AppContext';

const MonthSelector = () => {

  const { currentMonth, setCurrentMonth } = useAppContext();
  const handleDateChange = (newDate: Date | null) => {
    console.log(newDate);
    if (newDate) {
      setCurrentMonth(newDate);
    }
  }

  /** 先月ボタン押下時の処理 */
  const handlePreviousMonth = () => {
    const previousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(previousMonth);
  }

  /** 次月ボタン押下時の処理 */
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
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
          onChange={handleDateChange}
          label="年月を選択"
          value={currentMonth}
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