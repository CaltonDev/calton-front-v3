import styles from './Switch.module.scss'
import { SwitchProps } from './Switch.interface'
import React from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'

const Switch = ({
    checked = false,
    disabled = false,
    onClick,
    icon = false,
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
            <span className={`${styles.slider} ${styles.round}`}>
                {icon && (
                    <>
                        <div
                            className={
                                !checked
                                    ? styles.iconNotChecked
                                    : styles.iconNotDisplayed
                            }
                        >
                            <SvgWrapper
                                size={'xsmall'}
                                color={'secondary'}
                                keySvg={'lockClosedSvg'}
                            />
                        </div>
                        <div
                            className={
                                checked
                                    ? styles.iconChecked
                                    : styles.iconNotDisplayed
                            }
                        >
                            <SvgWrapper
                                size={'xsmall'}
                                color={'secondary'}
                                keySvg={'lockOpenedSvg'}
                            />
                        </div>
                    </>
                )}
            </span>
        </label>
    )
}

export default Switch
