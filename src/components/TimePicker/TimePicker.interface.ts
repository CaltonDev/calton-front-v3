import { Moment } from 'moment'

export interface TimePickerProps {
    onChange: (time: Moment) => void
    value: Moment
    variant?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'success'
        | 'disabled'
        | 'outlined'
}
