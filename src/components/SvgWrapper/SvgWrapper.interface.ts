export interface SvgWrapperProps {
    keySvg?: string
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    color?: 'primary' | 'secondary' | 'disabled' | 'primaryIcon'
    isClickable?: boolean
    hasContainerProps?: {
        hasContainer: boolean
        containerSize: number
    }
    customWidth?: number
    customHeight?: number
    customColor?: string
}

export interface SvgProps {
    width?: number
    height?: number
    fillColor?: string
}
