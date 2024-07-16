import styles from './Select.module.scss'
import { SelectProps } from './Select.interface'
import React, { useState } from 'react'
import Select from 'react-select'

const CaltonSelect = ({
    size,
    disabled = false,
    color = 'primary',
    onChange,
    options,
    placeholder = '',
    value,
    customColor,
    fontSize,
}: SelectProps) => {
    const colorClass = color ? styles[color] : ''
    const sizeClass = size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''
    const containerSizeClass = size ? styles[`${size}Container`] : ''
    const fontSizeClass = fontSize
        ? styles[
              'fontSize' +
                  fontSize?.charAt(0).toUpperCase() +
                  fontSize?.slice(1)
          ]
        : ''

    return (
        <div className={`${styles.container} ${containerSizeClass}`}>
            <Select
                classNames={{
                    control: () =>
                        `${styles.input} ${colorClass} ${sizeClass} ${disabledClass} ${fontSizeClass}`,
                    menu: () => `${styles.menu}`,
                    option: () => `${styles.menuItem}`,
                }}
                isSearchable={false}
                defaultValue={value}
                onChange={(value, action) => {
                    if (onChange) {
                        onChange(value, action)
                    }
                }}
                options={options}
                styles={{
                    control: (baseStyles) => ({
                        borderColor: customColor
                            ? customColor + '!important'
                            : '',
                        background: customColor
                            ? customColor + '!important'
                            : '',
                    }),
                    dropdownIndicator: (base, state) => ({
                        ...base,
                        color: 'white',
                        transition: 'color 0.2s',
                        ':hover': {
                            color: '#d3d3d3',
                        },
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: customColor ? 'white!important' : '',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: 'white', // Change placeholder text color
                    }),
                }}
                components={{
                    IndicatorSeparator: () => null,
                }}
                //menuIsOpen={true}
            />
        </div>
    )
}

export default CaltonSelect
