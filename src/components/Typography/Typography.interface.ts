export interface TypographyProps {
    size:
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
    weight: 'light' | 'normal' | 'bold'
    color?:
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'reviews'
        | 'surveys'
        | 'competitor'
        | 'listing'
        | 'white'
    italic?: boolean
    underline?: boolean
    uppercase?: boolean
    children: string
}
