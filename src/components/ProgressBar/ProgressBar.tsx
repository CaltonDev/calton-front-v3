import React from 'react'
import { ProgressBarProps } from './ProgressBar.interface'
import styles from './ProgressBar.module.scss'
const ProgressBar = ({
    progress,
    progressTotal,
    progressText = '',
}: ProgressBarProps) => {
    const _progress = Math.min(
        Math.max(0, (progress * 100) / progressTotal),
        100
    )
    return (
        <div className={styles.progressBar}>
            <div
                className={styles.progress}
                style={{ width: `${_progress}%` }}
            ></div>
            <span>{progressText}</span>
        </div>
    )
}

export default ProgressBar
