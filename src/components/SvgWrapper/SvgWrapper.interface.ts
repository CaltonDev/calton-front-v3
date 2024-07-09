export interface SvgWrapperProps {
    keySvg?: string
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    color?: 'primary' | 'secondary' | 'disabled'
    isClickable?: boolean
}

export interface SvgProps {
    width?: number
    height?: number
    fillColor?: string
}
