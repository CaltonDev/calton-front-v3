import * as React from 'react'
export interface SwitchProps {
    checked?: boolean
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLInputElement>
    icon?: boolean
}
