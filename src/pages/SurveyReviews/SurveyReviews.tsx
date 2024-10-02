import styles from './SurveyReviews.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import { SectionDataType, SectionType } from './SurveyReviews.interface'
import SettingsFieldsContainer from '../../components/SettingsFieldsContainer/SettingsFieldsContainer'
import SurveyRecap from '../SurveyRecap/SurveyRecap'
import SurveysInsights from '../SurveyInsights/SurveysInsights'
import SurveyReplies from '../SurveyReplies/SurveyReplies'

function SurveyReviews() {
    const { t } = useTranslation()
    const [activeSection, setActiveSection] = useState<SectionType>({
        index: 0,
        type: 'riepilogo',
    })

    const sectionData: SectionDataType[] = [
        {
            key: 'riepilogo',
            label: t('Riepilogo'),
            displayLabel: t('riepilogo'),
        },
        {
            key: 'insights',
            label: t('Insights'),
            displayLabel: t('insights'),
        },
        {
            key: 'risposte',
            label: t('Risposte'),
            displayLabel: t('risposte'),
        },
    ]

    return (
        <PageContainer>
            <PageHeader
                heading={t('Impostazioni')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.leftItemContainer}>
                        {sectionData?.map((obj, idx) => {
                            return (
                                <div
                                    key={obj?.key}
                                    onClick={() =>
                                        setActiveSection({
                                            index: idx,
                                            type: obj?.key,
                                        })
                                    }
                                    className={styles.headerLabelContainer}
                                >
                                    <Typography
                                        size={'bodyBig'}
                                        weight={'normal'}
                                        color={
                                            idx === activeSection.index
                                                ? 'surveys'
                                                : 'grey'
                                        }
                                    >
                                        {obj?.label}
                                    </Typography>
                                    <div
                                        className={
                                            idx === activeSection.index
                                                ? styles.lineSelected
                                                : styles.line
                                        }
                                    ></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {activeSection.type === 'riepilogo' ? (
                    <SurveyRecap id={'66601ecd0bac942433a24fdf'} />
                ) : activeSection.type === 'insights' ? (
                    <SurveysInsights id={'66601ecd0bac942433a24fdf'} />
                ) : (
                    <SurveyReplies />
                )}
            </div>
        </PageContainer>
    )
}

export default SurveyReviews
