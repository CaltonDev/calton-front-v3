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
    isRating?: number
}
