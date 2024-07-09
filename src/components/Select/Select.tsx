import styles from './Select.module.scss'
import { SelectProps } from './Select.interface'
import React from 'react'

const Select = ({
    size,
    disabled = false,
    color = 'primary',
    onChange,
    options,
    placeholder = '',
    value = '',
    customColor,
}: SelectProps) => {
    const colorClass = color ? styles[color] : ''
    const sizeClass = size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''
    const containerSizeClass = size ? styles[`${size}Container`] : ''

    return (
        <div className={`${styles.container} ${containerSizeClass}`}>
            <select
                value={value}
                onChange={onChange}
                className={`${styles.input} ${colorClass} ${sizeClass} ${disabledClass}`}
                style={
                    customColor
                        ? {
                              background: customColor,
                              borderColor: customColor,
                              color: 'white',
                          }
                        : {}
                }
                disabled={disabled}
            >
                {placeholder !== '' && <option value="">{placeholder}</option>}
                {options?.map((option: { value: any; label: any }) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
