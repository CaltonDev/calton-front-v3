import styles from './Input.module.scss'
import { InputProps } from './Input.interface'
import React from 'react'

const Input = ({
    size,
    disabled = false,
    color = 'primary',
    onChange,
    placeholder = '',
    type = 'text',
    value = '',
}: InputProps) => {
    const colorClass = color ? styles[color] : ''
    const sizeClass = size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''

    return (
        <>
            <input
                className={`${styles.input} ${colorClass} ${sizeClass} ${disabledClass}`}
                disabled={disabled}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={!value ? placeholder : ''}
            />
        </>
    )
}

export default Input
