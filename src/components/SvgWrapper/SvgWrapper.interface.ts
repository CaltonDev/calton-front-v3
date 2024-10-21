import * as React from 'react'
export interface SvgWrapperProps {
    keySvg: string
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    color?:
        | 'primary'
        | 'secondary'
        | 'disabled'
        | 'primaryIcon'
        | 'white'
        | 'black'
    isClickable?: boolean
    hasContainerProps?: {
        hasContainer: boolean
        containerSize: number
        background?: string
        border?: string
        outlined?: boolean
        borderRadius?: number
    }
    customWidth?: number
    customHeight?: number
    customColor?: string
    svgBackgroundColor?: string | null
    onClick?: React.MouseEventHandler<HTMLDivElement>
    disabled?: boolean
}

export interface SvgProps {
    width?: number
    height?: number
    fillColor?: string
    svgBackgroundColor?: string | null
}
