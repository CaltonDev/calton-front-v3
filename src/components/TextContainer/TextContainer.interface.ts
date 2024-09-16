export interface TextContainerProps {
    label?: string
    color?: string
    iconSvg?: string
    textColor?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'reviews'
        | 'surveys'
        | 'competitor'
        | 'listing'
        | 'white'
        | 'grey'
        | 'blue'
        | 'black'
    customTextColor?: string
    isRating?: number
    rightSideIcon?: boolean
    customIconWidth?: number
    customIconHeight?: number
    iconColor?: string
    textSize?:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'bodyBig'
        | 'bodyMedium'
        | 'bodySmall'
        | 'bodyXSmall'
        | 'bodyXXSmall'
    iconCallback?: (arg0: any) => void
}
