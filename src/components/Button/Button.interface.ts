export interface ButtonProps {
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
    weight: 'light' | 'normal' | 'bold'
    color?: 'primary' | 'secondary'
    italic?: boolean
    underline?: boolean
    uppercase?: boolean
    children: string
}
