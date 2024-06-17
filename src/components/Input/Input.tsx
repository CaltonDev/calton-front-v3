import styles from './Input.module.scss'
import { InputProps } from './Input.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

const Input = ({
    size,
    disabled = false,
    color = 'primary',
    onChange,
    placeholder = '',
    type = 'text',
    value = '',
    prefix,
    suffix,
}: InputProps) => {
    const colorClass = color ? styles[color] : ''
    const sizeClass = size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''

    return (
        <div className={styles.container}>
            {(suffix || prefix) && (
                <div
                    className={
                        prefix
                            ? styles.iconContainerPrefix
                            : suffix
                              ? styles.iconContainerSuffix
                              : ''
                    }
                >
                    <SvgWrapper
                        size={size}
                        color={'secondary'}
                        keySvg={prefix ? prefix : suffix ? suffix : ''}
                    />
                </div>
            )}
            <input
                className={`${styles.input} ${colorClass} ${sizeClass} ${disabledClass}`}
                disabled={disabled}
                onChange={onChange}
                type={type}
                value={value}
                placeholder={!value ? placeholder : ''}
            />
        </div>
    )
}

export default Input
