import * as React from 'react'

type SingleValue<T> = T | null
type ActionMeta<T> = {
    action: string
    // other properties as needed
}

export type Value = {
    value?: string
    label?: string
    className?: string
    icon?: string
}
export interface SelectProps {
    options?: Value[]
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    disabled?: boolean
    customColor?: string
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholderColor?: string
    value?: Value
    fontSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    onChange?: (
        newValue: SingleValue<Value>,
        actionMeta: ActionMeta<string | number>
    ) => void
    customHeight?: string
}
