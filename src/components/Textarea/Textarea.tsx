import styles from './Textarea.module.scss'
import { TextareaProps } from './Textarea.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import {
    iconExtraSmallSize,
    iconLargeSize,
    iconMediumSize,
    iconSmallSize,
    iconXLargeSize,
} from '../../constants/constants'

const Textarea = ({
    rows,
    cols,
    disabled = false,
    color = 'primary',
    onChange,
    placeholder = '',
    value = '',
    icon,
    iconCallback,
    fullWidth = false,
    size,
    customPadding,
}: TextareaProps) => {
    const colorClass = color ? styles[color] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''
    const sizeClass = fullWidth ? styles['fullWidth'] : size ? styles[size] : ''
    const containerSizeClass = fullWidth ? styles[`fullWidthContainer`] : ''

    return (
        <div className={`${styles.container} ${containerSizeClass}`}>
            <textarea
                className={`${styles.textarea} ${colorClass} ${disabledClass} ${sizeClass}`}
                disabled={disabled}
                onChange={onChange}
                value={value}
                placeholder={!value ? placeholder : ''}
                rows={rows}
                cols={cols}
                style={{ paddingRight: customPadding }}
            />
            {icon && (
                <div className={styles.iconContainer}>
                    <SvgWrapper
                        onClick={iconCallback}
                        keySvg={icon}
                        size={'small'}
                        hasContainerProps={{
                            hasContainer: true,
                            containerSize: 32,
                            background: '#D1D3FE',
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default Textarea
