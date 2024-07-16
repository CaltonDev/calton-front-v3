import * as React from 'react'

type SingleValue<T> = T | null
type ActionMeta<T> = {
    action: string
    // other properties as needed
}

export interface SelectProps {
    options?: any
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    disabled?: boolean
    customColor?: string
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    value?: string | number
    fontSize?: string
    onChange?: (
        newValue: SingleValue<string | number>,
        actionMeta: ActionMeta<string | number>
    ) => void
}
