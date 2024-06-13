import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React, { useEffect, useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import { getCSSVariable } from '../../utils/getCSSVariable'

const Button = ({
    size,
    disabled = false,
    isLoading = false,
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

    const [iconColor, setIconColor] = useState('')

    useEffect(() => {
        let iconColorString = ''

        if (variant === 'solid') {
            iconColorString = getCSSVariable('--primary-icon-color')
        } else {
            if (disabled) {
                iconColorString = getCSSVariable('--disable-icon-color')
            } else {
                iconColorString = getCSSVariable('--secondary-icon-color')
            }
        }

        setIconColor(iconColorString)
    }, [disabled, variant])

    return (
        <>
            <button
                className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${arrowDirection}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
                {arrowPlacement !== 'none' && (
                    <SvgWrapper
                        width={24}
                        height={24}
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
