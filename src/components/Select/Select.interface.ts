import * as React from 'react'

type SingleValue<T> = T | null
type ActionMeta<T> = {
    action: string
    // other properties as needed
}

export type Value = {
    value?: string
    label?: string
    className: string
}
export interface SelectProps {
    options?: Value[]
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    disabled?: boolean
    customColor?: string
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    value?: Value
    fontSize?: string
    onChange?: (
        newValue: SingleValue<Value>,
        actionMeta: ActionMeta<string | number>
    ) => void
}
