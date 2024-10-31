import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'
import { useTheme } from '@mui/material';
import { format, isSameMonth } from 'date-fns';
import useMonthlyTransactions from '../hooks/useMonthlyTransactions';
import { useAppContext } from './AppContext';

interface CalendarProps {
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  onDateClick: (dateInfo: DateClickArg) => void;
}

const Calendar = ({ setCurrentDay, currentDay, onDateClick }: CalendarProps) => {
  const { setCurrentMonth } = useAppContext();
  const monthlyTransactions = useMonthlyTransactions();
  const theme = useTheme();
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  const setBackgroundColorEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  }

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div>
          <div className='money' id='event-income'>{eventInfo.event.extendedProps.income}</div>
        </div>
        <div>
          <div className='money' id='event-expense'>{eventInfo.event.extendedProps.expense}</div>
        </div>
        <div>
          <div className='money' id='event-balance'>{eventInfo.event.extendedProps.balance}</div>
        </div>
      </div>

    )
  }

  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances);

  const handleDateSet = (dateSetInfo: DatesSetArg) => {
    const currentMonth = dateSetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const today = format(new Date(), "yyyy-MM-dd");
    if (isSameMonth(new Date(), currentMonth)) {
      setCurrentDay(today)
    }
  }

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={[...calendarEvents, setBackgroundColorEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={onDateClick}
    />
  )
}

export default Calendar