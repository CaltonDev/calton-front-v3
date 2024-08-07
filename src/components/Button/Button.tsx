import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { getBackgroundColor } from '../../utils/utils'

const Button = ({
    size,
    iconOnly = false,
    rounded = false,
    disabled = false,
    arrowPlacement = 'none',
    variant = 'solid',
    onClick,
    children,
    fullWidth = false,
    color,
    customPadding,
    customColor,
    customTextColor,
}: ButtonProps) => {
    const variantClass = variant ? styles[variant] : ''
    const sizeClass = size ? styles[size] : ''
    const fullWidthClass = fullWidth ? styles['fullwidth'] : ''
    const disabledClass = disabled ? styles[`disabled-${variant}`] : ''
    const arrowDirection =
        arrowPlacement !== 'none'
            ? arrowPlacement === 'left'
                ? styles['arrowLeft']
                : styles['arrowRight']
            : ''

    const iconOnlyClass = iconOnly ? styles[`iconOnly-${size}`] : ''
    const roundedClass = rounded ? styles[`rounded-${size}`] : ''

    return (
        <>
            <button
                className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${arrowDirection} ${iconOnlyClass} ${roundedClass} ${fullWidthClass}`}
                style={{
                    background: customColor
                        ? customColor
                        : color
                          ? getBackgroundColor(color ? color : '')
                          : '',
                    color: customTextColor ? customTextColor : '',
                    padding: customPadding ? customPadding : '',
                }}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
                {arrowPlacement !== 'none' && (
                    <SvgWrapper
                        size={size}
                        color={
                            variant === 'solid'
                                ? 'primary'
                                : disabled
                                  ? 'disabled'
                                  : 'secondary'
                        }
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
