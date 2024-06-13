import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'
import React from 'react'

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
    return (
        <>
            <button
                className={`${styles.button} ${variantClass} ${sizeClass} ${disabledClass}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    )
}

export default Button
