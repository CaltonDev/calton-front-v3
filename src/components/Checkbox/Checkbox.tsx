import styles from './Checkbox.module.scss'
import { CheckboxProps } from './Checkbox.interface'
import React from 'react'
import Typography from '../Typography/Typography'

const Checkbox = ({
    checked = false,
    disabled = false,
    color = 'primary',
    onClick,
    type = 'checkbox',
    title = '',
    subtitle = '',
    hasContainer = false,
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
    return (
        <label
            className={`${styles.container} ${disabledCheckmarkClass} ${secondaryCheckmarkClass} ${containerRadius} ${containerRadiusAfter}`}
        >
            <div>
                <div
                    className={styles.textContainer}
                    style={subtitle === '' ? { marginTop: 3 } : {}}
                >
                    <Typography weight={'normal'} size={'bodySmall'}>
                        {title}
                    </Typography>
                    <Typography
                        weight={'light'}
                        size={'bodySmall'}
                        color={'tertiary'}
                    >
                        {subtitle}
                    </Typography>
                </div>
                <input
                    type={'checkbox'}
                    checked={checked}
                    onClick={onClick}
                    disabled={disabled}
                />
                <span
                    className={`${styles.checkmark} ${disabledClass} ${checkboxClass} ${checkmarkClass} ${isRadius}`}
                />
            </div>
        </label>
    )
}

export default Checkbox
