import * as React from 'react'
export interface ButtonProps {
    size: 'small' | 'medium' | 'large'
    disabled?: boolean
    isLoading?: boolean
    arrowPlacement?: 'left' | 'right' | 'none'
    variant?: 'solid' | 'outline' | 'ghost'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children: string
}
