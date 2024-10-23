import React, { useState } from 'react'
import styles from './Tooltip.module.scss'
import { TooltipProps } from './Tooltip.interface'
import Typography from '../Typography/Typography'

const Tooltip = ({
    title,
    direction = 'top',
    children,
    color = 'white',
    backgroundColor = 'black',
}: TooltipProps) => {
    const [active, setActive] = useState(false)

    const showTip = () => {
        setActive(true)
    }

    const hideTip = () => {
        setActive(false)
    }

    return (
        <div
            className={styles.TooltipWrapper}
            onMouseEnter={showTip}
            onMouseLeave={hideTip}
        >
            {children}
            {active && (
                <div
                    className={`${styles.TooltipTip} ${
                        styles[direction || 'top']
                    }`}
                    style={{ background: backgroundColor }}
                >
                    {' '}
                    <Typography
                        size={'bodyMedium'}
                        weight={'normal'}
                        customTextColor={color}
                    >
                        {title}
                    </Typography>
                </div>
            )}
        </div>
    )
}

export default Tooltip
