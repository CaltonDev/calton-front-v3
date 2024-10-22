import React from 'react'
import styles from './RctBlockPost.module.scss'
import { RctBlockPostProps } from './RctBlockPost.interface'
function RctBlockPost({
    children,
    customStyle,
    customClassName,
    title,
    subtitle,
}: RctBlockPostProps) {
    return title ? (
        <div
            className={[
                styles.rctBlockWithoutMarginBottom,
                customClassName && customClassName,
            ].join('')}
            style={customStyle}
        >
            <div
                className={[
                    styles.rctBlockPostPreview,
                    customClassName && customClassName,
                ].join('')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 30,
                }}
            >
                <div className={styles.textContainer}>
                    <span className={styles.headerTitle}>{title}</span>
                    <span className={styles.headerSubtitle}>{subtitle}</span>
                </div>
            </div>
            {children}
            <div
                className={[
                    styles.rctBlockPostPreview,
                    customClassName && customClassName,
                ].join('')}
            />
        </div>
    ) : (
        <div
            className={[
                styles.rctBlock,
                customClassName && customClassName,
            ].join('')}
            style={customStyle}
        >
            {children}
        </div>
    )
}

export default RctBlockPost
