import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ({ monthlyTransactions, setCurrentMonth }: CalendarProps) => {
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

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
    setCurrentMonth(dateSetInfo.view.currentStart)
  }

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calendar