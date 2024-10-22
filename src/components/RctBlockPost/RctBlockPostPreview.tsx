import React from 'react'
import styles from './RctBlock.module.scss'
import { RctBlockPostProps } from './RctBlockPost.interface'

function RctBlockPostPreview({
    children,
    customStyle,
    customClassName,
    title,
}: RctBlockPostProps) {
    return (
        <>
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
                <span className={styles.headerTitle}>{title}</span>
            </div>
            <div style={customStyle}>{children}</div>
            <div
                className={[
                    styles.rctBlockPostPreviewRightCols,
                    customClassName && customClassName,
                ].join('')}
            />
        </>
    )
}

export default RctBlockPostPreview
