import styles from './Select.module.scss'
import { SelectProps } from './Select.interface'
import React, { useState } from 'react'
import Select, { components } from 'react-select'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
const CaltonSelect = ({
    size,
    disabled = false,
    color = 'primary',
    onChange,
    options,
    value,
    customColor,
    customBorderColor,
    customWidth,
    placeholderColor,
    fontSize,
    customHeight,
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

    const { Option } = components
    const IconOption = (props: any) => (
        <Option {...props}>
            <div className={styles.optionContainer}>
                {props.data.label}
                {props.data.icon && (
                    <SvgWrapper size={'small'} keySvg={props.data.icon} />
                )}
            </div>
        </Option>
    )
    const SingleValueIcon = (props: any) => {
        return (
            <div className={styles.valueContainer} style={{}}>
                {props?.selectProps.getOptionLabel(props?.data)}
                {props.data.icon && (
                    <SvgWrapper size={'small'} keySvg={props.data.icon} />
                )}
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${containerSizeClass}`}>
            <Select
                classNames={{
                    control: () =>
                        `${styles.input} ${colorClass} ${sizeClass} ${disabledClass} ${fontSizeClass}`,
                    menu: () => `${styles.menu}`,
                    option: () => `${styles.menuItem} ${fontSizeClass}`,
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
                    valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        display: 'flex',
                        color: placeholderColor
                            ? placeholderColor
                            : 'white !important',
                    }),
                    control: (baseStyles) => ({
                        borderColor: customBorderColor
                            ? customBorderColor + '!important'
                            : customColor
                              ? customColor + '!important'
                              : '',
                        background: customColor
                            ? customColor + '!important'
                            : '',
                        cursor: 'pointer',
                        height: customHeight ? customHeight : '',
                        ':active': {
                            ...baseStyles[':active'],
                            backgroundColor: 'red',
                        },
                        width: customWidth ? customWidth + '!important' : '',
                    }),
                    dropdownIndicator: (base, state) => ({
                        ...base,
                        color: placeholderColor ? placeholderColor : 'white',
                        transition: 'color 0.2s',
                        ':hover': {
                            color: '#d3d3d3',
                        },
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: placeholderColor
                            ? placeholderColor
                            : 'white !important',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: placeholderColor ? placeholderColor : 'white', // Change placeholder text color
                    }),
                    input: (base) => ({
                        ...base,
                    }),
                }}
                components={{
                    IndicatorSeparator: () => null,
                    Option: IconOption,
                    SingleValue: SingleValueIcon,
                }}
                //menuIsOpen={true}
            />
        </div>
    )
}

export default CaltonSelect
