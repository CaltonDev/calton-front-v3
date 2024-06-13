import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React, { useEffect, useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { getCSSVariable } from '../../utils/getCSSVariable'

const Button = ({
    size,
    iconOnly = false,
    rounded = false,
    disabled = false,
    arrowPlacement = 'none',
    variant = 'solid',
    onClick,
    children,
}: ButtonProps) => {
    const variantClass = variant ? styles[variant] : ''
    const sizeClass = size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled-${variant}`] : ''
    const arrowDirection =
        arrowPlacement !== 'none'
            ? arrowPlacement === 'left'
                ? styles['arrowLeft']
                : styles['arrowRight']
            : ''

    const iconOnlyClass = iconOnly ? styles[`iconOnly-${size}`] : ''
    const roundedClass = rounded ? styles[`rounded-${size}`] : ''
    const [iconColor, setIconColor] = useState('')
    const [iconSize, setIconSize] = useState(24)

    const selectIconColor = () => {
        let iconColorString = getCSSVariable('--primary-icon-color')

        if (variant !== 'solid') {
            if (disabled) {
                iconColorString = getCSSVariable('--disable-icon-color')
            } else {
                iconColorString = getCSSVariable('--secondary-icon-color')
            }
        }

        setIconColor(iconColorString)
    }

    const selectIconSize = () => {
        let iconSizeValue = Number(getCSSVariable('--large-icon-size'))
        if (size === 'small') {
            iconSizeValue = Number(getCSSVariable('--small-icon-size'))
        } else if (size === 'medium') {
            iconSizeValue = Number(getCSSVariable('--medium-icon-size'))
        }

        setIconSize(iconSizeValue)
    }
    useEffect(() => {
        selectIconColor()
        selectIconSize()
    }, [disabled, variant])

    return (
        <>
            <button
                className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${arrowDirection} ${iconOnlyClass} ${roundedClass}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
                {arrowPlacement !== 'none' && (
                    <SvgWrapper
                        width={iconSize}
                        height={iconSize}
                        fillColor={iconColor}
                        keySvg={
                            arrowPlacement === 'left'
                                ? 'arrowBack'
                                : 'arrowForward'
                        }
                    />
                )}
            </button>
        </>
    )
}

export default Button
