import styles from '../CardInsights.module.scss'
import React from 'react'
import ChartHeader from '../../Charts/ChartHeader/ChartHeader'

function HeaderNPS(response: any) {
    return (
        <ChartHeader
            dataReady={true}
            textForNumber={'NPS score: '}
            classTextForNumber={styles.textForNumber}
            styleCounter={styles.countUpNPS}
            numberToShow={response?.data?.npsScore}
            decimals={0}
        />
    )
}

export default HeaderNPS
