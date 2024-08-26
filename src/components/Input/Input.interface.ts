import * as React from 'react'
import { ChangeEvent } from 'react'
export interface InputProps {
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    name?: string
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
    type?: 'text' | 'number' | 'email' | 'password' | 'date'
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    prefix?: string
    suffix?: string
    iconCallback?: React.MouseEventHandler<HTMLDivElement>
    fullWidth?: boolean
    floatingDisplay?: boolean
    isSquared?: boolean
}
