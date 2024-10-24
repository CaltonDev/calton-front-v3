import { DateLocalizer, View } from 'react-big-calendar'
import React from 'react'

// Define the type for events in your calendar
interface CalendarEvent {
    id: number
    title: string
    start: string
    end: string
    allDay?: boolean
    type?: string
}

// Define the props matching the Calendar's props
export interface CalendarProps {
    defaultDate: Date
    defaultView: View
    events?: CalendarEvent[]
    localizer: DateLocalizer
    onSelectSlot: (data: any) => void
    onSelectEvent: (event: CalendarEvent) => void
    onView: (view: View) => void
    view: View
    date: Date
    components?: {
        [key: string]: React.ComponentType<any> | undefined
    }
    slotPropGetter?: (date: Date) => { style: any } | { style?: undefined }
    step?: number
    timeslots?: number
    selectable?: boolean
    showMultiDayTimes?: boolean
    toolbar?: boolean
    showAllEvents?: boolean
    views?: string[] | { [viewName: string]: boolean }
}
