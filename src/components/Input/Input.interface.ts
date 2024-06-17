import * as React from 'react'
export interface InputProps {
    size: 'small' | 'medium' | 'large'
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    type?: 'text' | 'number' | 'email' | 'password' | 'date'
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}
