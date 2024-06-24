import * as React from 'react'
export interface CheckboxProps {
    checked?: boolean
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'shadow'
    type?: 'checkbox' | 'radio'
    onClick?: React.MouseEventHandler<HTMLInputElement>
    title?: string
    subtitle?: string
    hasContainer?: boolean
}
