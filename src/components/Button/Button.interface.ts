import * as React from 'react'
export interface ButtonProps {
    size: 'small' | 'medium' | 'large'
    disabled?: boolean
    iconOnly?: boolean
    rounded?: boolean
    arrowPlacement?: 'left' | 'right' | 'none'
    variant?: 'solid' | 'outline' | 'ghost'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: string
}
