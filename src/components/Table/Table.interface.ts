import * as React from 'react'
export interface TableProps {
    rows?: number
    cols?: number
    disabled?: boolean
    color?: 'primary' | 'secondary' | 'error' | 'success'
    placeholder?: string
    value?: string | number
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    icon?: string
    iconCallback?: React.MouseEventHandler<HTMLDivElement>
    fullWidth?: boolean
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    customPadding?: string
}
