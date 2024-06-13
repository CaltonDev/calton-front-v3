import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

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
