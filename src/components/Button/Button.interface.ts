import * as React from 'react'
import { SvgKeyType } from '../SvgWrapper/SvgWrapper.interface'
export interface ButtonProps {
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    iconOnly?: boolean
    rounded?: boolean
    arrowPlacement?: 'left' | 'right' | 'none' | 'center'
    variant?: 'solid' | 'outline' | 'ghost'
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: string
    fullWidth?: boolean
    customPadding?: string
    customColor?: string
    customTextColor?: string
    customBorderColor?: string
    color?:
        | 'reviews'
        | 'surveys'
        | 'competitor'
        | 'listing'
        | 'white'
        | 'black'
        | 'settings'
    customWidth?: number
    customHeight?: number
    icon?: SvgKeyType
    className?: string
    iconColor?:
        | 'primary'
        | 'secondary'
        | 'disabled'
        | 'primaryIcon'
        | 'white'
        | 'black'
}
