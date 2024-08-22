import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { SelectedWordsState } from '../../../store/home/selectedWordsSlice'
import { useTranslation } from 'react-i18next'
import Hooks from '../../../utils/hooks/Hooks'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import DonutCard from '../../../components/DonutCard/DonutCard'
import TrackerCard from '../../../components/TrackerCard/TrackerCard'
import TierListCard from '../../../components/TierListCard/TierListCard'
import styles from './HomeReviews.module.scss'
import ReviewCard from '../../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../../components/Button/Button'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import FeedbackService from '../../../services/FeedbackService'
import LineChart from '../../../components/Charts/LineChart/LineChart'
import ChartConfig from '../../../constants/ChartConfig'
import CountUp from 'react-countup'
import InfoCardViewer from '../../../components/InfoCardViewer/InfoCardViewer'
function HomeReviews() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector((state: RootState) => state.SelectedWords)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const [isLoading, setIsLoading] = useState(true)
    const [infoData, setInfoData] = useState(null)
    const [sort, setSort] = useState([
        {
            name: 'data',
            direction: 'desc',
        },
    ])
    const [page, setPage] = useState(0)
    const search = useSelector((state: RootState) => state.Search.wordSearched)

    const averageReviewByTime = useSelector(
        (state: RootState) => state.AverageReviewByTime
    )
    const averageByTime = useSelector(
        (state: RootState) => state.AverageVotoByTime
    )

    const averageSentimentByTime = useSelector(
        (state: RootState) => state.AverageSentimentByTime
    )

    const { t } = useTranslation()

    const [currentPage, setCurrentPage] = useState(1)

    const reloadHome = async () => {
        await ServiceWrapper.wrapperReloadHome(
            allFilters,
            'Date',
            wordSelected,
            dispatch,
            20,
            undefined,
            t
        )
    }
    /*
    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    Hooks.useDeepCompareEffect(() => {
        reloadHome()
    }, [allFilters])*/

    const AiData = [
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ]
    return (
        <PageContainer>
            <PageHeader heading={t('Home')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.rowHome}>
                    <InfoCardViewer data={AiData} />
                </div>
                <div className={styles.rowHome}>
                    <LineChart
                        dataReady={!averageReviewByTime.isLoading}
                        color={ChartConfig.color.primary}
                        title={t('Numero di recensioni')}
                        styleCounter={styles.countUpReviews}
                        numberToShow={averageReviewByTime?.data?.totalFeedback}
                        contentPopover={t('NumeroRecensioniHelper')}
                        isRound={true}
                        label={t('Recensioni')}
                        chartdata={averageReviewByTime?.data}
                    />
                    <LineChart
                        dataReady={!averageByTime.isLoading}
                        title={t('Voto Medio')}
                        numberToShow={averageByTime?.data?.tot}
                        contentPopover={t('VotoMedioHelper')}
                        label={t('Valutazioni')}
                        styleCounter={styles.countUpRatings}
                        chartdata={averageByTime?.data?.values}
                        decimals={2}
                    />
                    <LineChart
                        dataReady={!averageSentimentByTime.isLoading}
                        isSentiment={true}
                        title={t('Sentiment')}
                        numberToShowComponent={
                            <>
                                <CountUp
                                    separator=","
                                    className={styles.countUpPos}
                                    start={0}
                                    end={averageSentimentByTime?.data?.countPos}
                                    duration={3}
                                    decimals={0}
                                    useEasing={true}
                                />
                                <CountUp
                                    separator=","
                                    className={styles.countUpNeg}
                                    start={0}
                                    end={averageSentimentByTime?.data?.countNeg}
                                    duration={3}
                                    decimals={0}
                                    useEasing={true}
                                />
                            </>
                        }
                        contentPopover={t('SentimentHelper')}
                        label={t('Sentiment')}
                        chartdata={averageSentimentByTime?.data?.chartdata}
                    />
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeReviews
