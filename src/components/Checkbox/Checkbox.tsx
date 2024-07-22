import styles from './Checkbox.module.scss'
import { CheckboxProps } from './Checkbox.interface'
import React, { useState } from 'react'
import Typography from '../Typography/Typography'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

const Checkbox = ({
    checked = false,
    disabled = false,
    color = 'primary',
    onClick,
    type = 'checkbox',
    title = '',
    subtitle = '',
    hasContainer = false,
    value,
    dropdown,
    dropdownOptions,
}: CheckboxProps) => {
    const checkboxClass = color ? styles[color] : ''
    const disabledClass = disabled ? styles[`disabled`] : ''
    const disabledCheckmarkClass = disabled ? styles['containerDisabled'] : ''
    const secondaryCheckmarkClass =
        color === 'secondary' ? styles['containerSecondary'] : ''
    const checkmarkClass = disabled
        ? styles['disabledCheckmark']
        : color === 'secondary'
          ? styles['secondaryCheckmark']
          : ''
    const isRadius = type == 'radio' ? styles['radius'] : ''
    const containerRadius = type == 'radio' ? styles['containerRadio'] : ''
    const containerRadiusAfter =
        type === 'radio' && disabled
            ? styles['containerRadioDisabled']
            : type === 'radio' && color === 'secondary'
              ? styles['containerRadioSecondary']
              : ''
    const hasContainerClass = hasContainer
        ? disabled
            ? styles['hasContainerClassDisabled']
            : color === 'secondary'
              ? styles['hasContainerClassSecondary']
              : styles['hasContainerClass']
        : ''

    const [showDropdownMenu, setShowDropdownMenu] = useState(false)

    return (
        <div
            className={`${hasContainerClass} ${hasContainer && styles.hasContainerClass}`}
        >
            <div style={{ display: 'flex' }}>
                <div
                    className={`${styles.container} ${disabledCheckmarkClass} ${secondaryCheckmarkClass} ${containerRadius} ${containerRadiusAfter}`}
                >
                    <div>
                        <div
                            className={
                                dropdown
                                    ? styles.textContainerDropdown
                                    : styles.textContainer
                            }
                            style={subtitle === '' ? { marginTop: 3 } : {}}
                        >
                            {dropdown && (
                                <div style={{ marginRight: 3 }}>
                                    <SvgWrapper
                                        onClick={() =>
                                            setShowDropdownMenu(
                                                !showDropdownMenu
                                            )
                                        }
                                        keySvg={'arrowDownSvg'}
                                        color={'black'}
                                        size={'small'}
                                    />
                                </div>
                            )}
                            <Typography weight={'normal'} size={'bodySmall'}>
                                {title}
                            </Typography>
                            {!hasContainer && (
                                <Typography
                                    weight={'light'}
                                    size={'bodySmall'}
                                    color={'tertiary'}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </div>
                        <input
                            type={'checkbox'}
                            checked={checked}
                            onClick={onClick}
                            disabled={disabled}
                        />
                        <span
                            onClick={onClick}
                            className={`${styles.checkmark} ${disabledClass} ${checkboxClass} ${checkmarkClass} ${isRadius}`}
                        />
                    </div>
                </div>
            </div>
            {showDropdownMenu && (
                <div className={styles.dropdownOptionsContainer}>
                    <div className={styles.paddingContainer}>
                        {dropdownOptions?.map((option) => {
                            return (
                                <div
                                    onClick={option?.onClick}
                                    key={option?.key}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'normal'}
                                    >
                                        {option?.displayLabel}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Checkbox
