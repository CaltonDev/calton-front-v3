import React from 'react'
import styles from './RibbonPostType.module.scss'
import { RibbonPostTypeProps } from './RibbonPostType.interface'

function RibbonPostType({
    label,
    isFromGrid,
    isPlaceholder,
}: RibbonPostTypeProps) {
    return (
        <div
            className={
                isPlaceholder
                    ? styles.ribbonContainer
                    : isFromGrid
                      ? styles.ribbonContainerFromGrid
                      : styles.ribbonContainerFromGrid
            }
        >
            <span className={styles.imgLabel} id="ribbon">
                {label}
            </span>
        </div>
    )
}

export default RibbonPostType
