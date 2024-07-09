import * as React from 'react'
export interface SelectProps {
    options?: any
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    disabled?: boolean
    customColor?: string
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLSelectElement>
}
