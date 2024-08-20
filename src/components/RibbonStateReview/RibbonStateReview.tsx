import React from 'react'
import styles from './RibbonStateReview.module.scss'
import { useTranslation } from 'react-i18next'
import { RibbonStateReviewProps } from './RibbonStateReview.interface'

function RibbonStateReview({
    isAnswered,
    competitor,
    colorCompetitor,
}: RibbonStateReviewProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.ribbonContainer}>
            <a
                style={{
                    background: colorCompetitor
                        ? colorCompetitor
                        : isAnswered
                          ? '#B7F3FF'
                          : '#FFD6B7',
                }}
                id="ribbon"
            >
                {competitor
                    ? competitor
                    : isAnswered
                      ? t('Risposta')
                      : t('Senza Risposta')}
            </a>
        </div>
    )
}

export default RibbonStateReview
