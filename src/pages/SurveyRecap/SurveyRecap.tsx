import styles from './SurveyRecap.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import InfoCard from '../../components/InfoCard/InfoCard'
import TrackerCard from '../../components/TrackerCard/TrackerCard'
import Table from '../../components/Table/Table'
import { PaginationState } from '@tanstack/react-table'
import HomeService from '../../services/HomeService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { SurveyRecapProps } from './SurveyRecap.interface'

function SurveyRecap({ id }: SurveyRecapProps) {
    const { t } = useTranslation()
    const allFilters = useSelector(selectAllFilters)

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            displayLabel: '15%',
            value: 200000,
            total: 15000,
        },
    ]

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const surveyData = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        [id]
    )?.data

    console.log('survey: ', surveyData)

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
            <Table
                data={surveyData?.typeformInfo?.fields || []}
                columnsData={surveyData?.columns || []}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    )
}

export default SurveyRecap
