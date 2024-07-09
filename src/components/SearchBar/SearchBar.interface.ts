import * as React from 'react'
export interface SearchBarProps {
    id?: string
    index?: number
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    prefix?: string
    suffix?: string
    iconCallback?: React.MouseEventHandler<HTMLDivElement>
}
