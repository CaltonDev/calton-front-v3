import styles from './Switch.module.scss'
import { SwitchProps } from './Switch.interface'
import React from 'react'
import Typography from '../Typography/Typography'

const Switch = ({
    checked = false,
    disabled = false,
    onClick,
    icon,
    iconCallback,
}: SwitchProps) => {
    return (
        <label className={styles.switch}>
            <input
                className={styles.input}
                type={'checkbox'}
                checked={checked}
                onClick={onClick}
                disabled={disabled}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    )
}

export default Switch
