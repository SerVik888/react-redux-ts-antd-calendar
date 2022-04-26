import { Calendar } from 'antd'
import { Moment } from 'moment'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { formatDate } from '../utils/date'

interface EventCalendarProps {
  events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = props => {
  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = props.events.filter(event => event.date === formatedDate)
    return (
      <div>
        {currentDayEvents.map((event, i) => (
          <div key={i}>{event.description}</div>
        ))}
      </div>
    )
  }

  return <Calendar dateCellRender={dateCellRender} />
}
