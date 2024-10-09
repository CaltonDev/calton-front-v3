import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { getBackgroundColor } from '../../utils/utils'
import { marginRight } from 'html2canvas/dist/types/css/property-descriptors/margin'

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
    customBorderColor,
    customWidth,
    customHeight,
    icon,
    iconColor,
    className,
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
                type={'submit'}
                className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${arrowDirection} ${iconOnlyClass} ${roundedClass} ${fullWidthClass} ${className}`}
                style={{
                    background: customColor
                        ? customColor
                        : color
                          ? getBackgroundColor(color ? color : '')
                          : '',
                    color: customTextColor ? customTextColor : '',
                    padding: customPadding ? customPadding : '',
                    borderColor: customBorderColor ? customBorderColor : '',
                    width: customWidth ? customWidth : '',
                    height: customHeight ? customHeight : '',
                }}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
                {arrowPlacement !== 'none' && (
                    <div
                        style={{
                            marginRight: arrowPlacement === 'left' ? 5 : '',
                        }}
                    >
                        <SvgWrapper
                            size={size}
                            color={
                                iconColor
                                    ? iconColor
                                    : variant === 'solid'
                                      ? 'primary'
                                      : disabled
                                        ? 'disabled'
                                        : 'black'
                                //   ? 'black'
                                //   : 'secondary'
                            }
                            keySvg={
                                icon
                                    ? icon
                                    : arrowPlacement === 'left'
                                      ? 'arrowBack'
                                      : 'arrowForward'
                            }
                        />
                    </div>
                )}
            </button>
        </>
    )
}

export default Button
