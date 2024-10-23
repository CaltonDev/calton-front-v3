import { ReactElement } from 'react'

export interface DatePickerProps {
    name: string
    selected: Date
    onChange: (args: any) => void
    isClearable?: boolean
    selectsRange?: boolean
    shouldCloseOnSelect?: boolean
    startOpen?: boolean
    preventOpenOnFocus?: boolean
    allowSameDay?: boolean
    placeholderText?: string
    dateFormat?: string
    variant?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'success'
        | 'disabled'
        | 'outlined'
    customInput?: ReactElement
    wrapperClassName?: string
}
