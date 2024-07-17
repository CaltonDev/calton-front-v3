import * as React from 'react'
export interface SvgWrapperProps {
    keySvg: string
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    color?: 'primary' | 'secondary' | 'disabled' | 'primaryIcon'
    isClickable?: boolean
    hasContainerProps?: {
        hasContainer: boolean
        containerSize: number
        background?: string
    }
    customWidth?: number
    customHeight?: number
    customColor?: string
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export interface SvgProps {
    width?: number
    height?: number
    fillColor?: string
}
