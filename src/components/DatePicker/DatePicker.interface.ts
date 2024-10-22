export interface DatePickerProps {
    selected: Date
    onChange: (args: any) => void
    isClearable?: boolean
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
}
