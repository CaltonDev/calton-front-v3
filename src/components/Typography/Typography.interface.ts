import React from 'react'

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
        | 'bodyXXSmall'
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
        | 'grey'
        | 'blue'
        | 'black'
        | 'green'
    italic?: boolean
    underline?: boolean
    uppercase?: boolean
    customTextColor?: string
    customFontSize?: number
    children: string
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}
