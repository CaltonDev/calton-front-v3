import * as React from 'react'
export interface ButtonProps {
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    iconOnly?: boolean
    rounded?: boolean
    arrowPlacement?: 'left' | 'right' | 'none'
    variant?: 'solid' | 'outline' | 'ghost'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: string
    fullWidth?: boolean
    customPadding?: string
    customColor?: string
    customTextColor?: string
    customBorderColor?: string
    color?: 'reviews' | 'surveys' | 'competitor' | 'listing' | 'white'
    customWidth?: number
    customHeight?: number
    icon?: string
    className?: string
}
