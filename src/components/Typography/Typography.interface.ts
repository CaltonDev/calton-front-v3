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
        | 'settings'
        | 'competitor'
        | 'listing'
        | 'white'
        | 'grey'
        | 'blue'
        | 'black'
        | 'green'
        | 'yellow'
        | 'red'
        | 'lightGrey'
    italic?: boolean
    underline?: boolean
    uppercase?: boolean
    customTextColor?: string
    customFontSize?: number
    children: string
    onClick?: React.MouseEventHandler<HTMLSpanElement>
    useSpan?: boolean
}
