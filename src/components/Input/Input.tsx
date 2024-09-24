import styles from './Input.module.scss'
import { InputProps } from './Input.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import {
    iconExtraSmallSize,
    iconLargeSize,
    iconMediumSize,
    iconSmallSize,
    iconXLargeSize,
} from '../../constants/constants'

const Input = ({
    size,
    disabled = false,
    name,
    onBlur,
    color = 'primary',
    onChange,
    placeholder = '',
    type = 'text',
    value = '',
    prefix,
    suffix,
    iconCallback,
    fullWidth = false,
    floatingDisplay = false,
    isSquared = false,
    onKeyDown,
    isFromForm = false,
    customClassName,
    customRef,
}: InputProps) => {
    console.log('ref: ', customRef)
    const colorClass = color ? styles[color] : ''
    const sizeClass = fullWidth ? styles['fullWidth'] : size ? styles[size] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''
    const containerSizeClass = fullWidth
        ? styles[`fullWidthContainer`]
        : size
          ? styles[`${size}Container`]
          : ''

    const floatingDisplayClass = floatingDisplay
        ? styles['floatingDisplay']
        : ''

    const iconSize =
        size === 'small'
            ? iconSmallSize
            : size === 'medium'
              ? iconMediumSize
              : size === 'large'
                ? iconLargeSize
                : iconXLargeSize

    const suffixClass =
        size === 'small'
            ? styles.iconContainerSuffixSmall
            : styles.iconContainerSuffixLarge

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && onKeyDown) {
            console.log('Event: ', event)
            onKeyDown(event.target.value)
        }
    }
    return (
        <div
            className={`${styles.container} ${containerSizeClass}`}
            style={{
                width: isSquared ? 41 : '',
            }}
        >
            {(suffix || prefix) && (
                <div
                    className={
                        prefix
                            ? size === 'xlarge'
                                ? styles.iconContainerPrefixXLarge
                                : styles.iconContainerPrefix
                            : suffix
                              ? suffixClass
                              : ''
                    }
                >
                    <div onClick={iconCallback ? iconCallback : undefined}>
                        <SvgWrapper
                            size={size}
                            color={'secondary'}
                            keySvg={prefix ? prefix : suffix ? suffix : ''}
                            isClickable={!!iconCallback}
                        />
                    </div>
                </div>
            )}
            <input
                ref={customRef}
                onKeyDown={handleKeyDown}
                name={name}
                onBlur={onBlur}
                className={`${styles.input} ${colorClass} ${sizeClass} ${disabledClass} ${floatingDisplayClass} ${customClassName}`}
                style={{
                    paddingLeft: prefix ? iconSize + 5 : '',
                    width: isSquared ? 41 : '',
                    marginBottom: isFromForm ? '3rem' : '0',
                }}
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
