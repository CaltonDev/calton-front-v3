import styles from './SurveyRecap.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import { SectionDataType, SectionType } from './SurveyRecap.interface'
import SettingsFieldsContainer from '../../components/SettingsFieldsContainer/SettingsFieldsContainer'
import InfoCard from '../../components/InfoCard/InfoCard'
import TrackerCard from '../../components/TrackerCard/TrackerCard'
import TierListCard from '../../components/TierListCard/TierListCard'

function SurveyRecap() {
    const { t } = useTranslation()

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            displayLabel: '15%',
            value: 200000,
            total: 15000,
        },
    ]
    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.itemContainer}>
                    <InfoCard
                        value={16}
                        label={t('Start')}
                        icon={'peopleSvg'}
                        iconColor={'#B57DFA'}
                    />
                </div>
                <div className={styles.itemContainer}>
                    <InfoCard
                        value={16}
                        label={t('Risposte')}
                        icon={'checkmarkSvg'}
                        iconColor={'#B57DFA'}
                    />
                </div>
                <div className={styles.itemContainer}>
                    <InfoCard
                        value={64}
                        label={t('Tempo medio')}
                        icon={'hours.svg'}
                        iconColor={'#B57DFA'}
                    />
                </div>
                <div className={styles.itemContainer}>
                    {/*todo: add correct sentiment icon and bg color*/}
                    <InfoCard
                        label={t('Sentiment medio')}
                        icon={'negativeSentiment.svg'}
                        backgroundIconColor={'#FFBCCE'}
                    />
                </div>
                <div className={styles.itemContainer}>
                    <TrackerCard data={trackerData} maxHeight={true} />
                </div>
            </div>
        </div>
    )
}

export default SurveyRecap
