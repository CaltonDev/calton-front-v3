import { createElement } from 'react'
import styles from './typography.module.scss'
import { TypographyProps } from './Typography.interface'

const Typography = ({
    size,
    weight,
    color = 'primary',
    italic,
    underline,
    uppercase,
    children,
    customTextColor,
    customFontSize,
    onClick,
    boldText,
}: TypographyProps) => {
    let className = styles[`${size}-${weight}-${color}`]

    if (italic) className += ` ${styles[`${size}-${weight}-italic`]}`
    if (underline) className += ` ${styles[`${size}-${weight}-underline`]}`
    if (uppercase) className += ` ${styles[`${size}-${weight}-uppercase`]}`

    const headingMap = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
    }

    const HeadingTag = headingMap[size as keyof typeof headingMap] || 'p'

    return createElement(
        HeadingTag,
        {
            style: {
                color: customTextColor ? customTextColor : '',
                fontSize: customFontSize ? customFontSize : '',
                cursor: onClick ? 'pointer' : '',
            },
            className,
            onClick,
        },
        children
    )
}

export default Typography
