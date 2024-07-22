import * as React from 'react'

type dropdownOptionsValue = {
    key: number
    displayLabel: string
    onClick: () => void
}

export interface CheckboxProps {
    checked?: boolean
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'shadow'
    type?: 'checkbox' | 'radio'
    onClick?: React.MouseEventHandler<HTMLInputElement>
    title?: string
    subtitle?: string
    hasContainer?: boolean
    value?: string | number
    dropdown?: boolean
    dropdownOptions?: dropdownOptionsValue[]
}
