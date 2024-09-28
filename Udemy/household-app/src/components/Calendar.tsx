import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'
import { Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'

interface CalendarProps {
  monthlyTransactions: Transaction[]
}

const Calendar = ({ monthlyTransactions }: CalendarProps) => {
  const dailyBalance = calculateDailyBalances(monthlyTransactions);

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

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={dailyBalance}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar