import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'

const Calendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Meeting', start: '2024-09-30', income: 400, expense: 200, balance: 200 }
  ]

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
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar