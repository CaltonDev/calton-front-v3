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
import TextContainer from '../../../components/TextContainer/TextContainer'
import HomeService from '../../../services/HomeService'
import { setBubbles } from '../../../store/home/bubbleSlice'
import { setSources } from '../../../store/home/sourceSlice'
import { setAverageVotoByTime } from '../../../store/home/averageVotoByTimeSlice'
import { setAverageReviewByTime } from '../../../store/home/averageReviewByTime'
import { setAverageSentimentByTime } from '../../../store/home/averageSentimentByTime'
import { setDistribuzioniRacc } from '../../../store/home/distribuzioneRaccomandazioni'
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

    const { t } = useTranslation()

    const [currentPage, setCurrentPage] = useState(1)

    /*
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
      Hooks.useDeepCompareEffect(() => {
        reloadHome()
    }, [allFilters])
*/

    //change wrapperReloadHome with singles react query
    const bubbleData = HomeService.wordsCountBUBBLE(
        allFilters,
        20,
        getNoCodeFromPlatfrom()
    )

    const sourcesHomeData = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        undefined,
        undefined,
        undefined,
        true,
        true
    )

    const averageVotoByTime = HomeService.getAverageByTime(
        allFilters,
        'rating',
        'Date',
        getNoCodeFromPlatfrom(),
        undefined,
        true,
        undefined
    )?.data

    const averageSentimentByTime = HomeService.getAverageByTime(
        allFilters,
        'sentiment',
        undefined,
        getNoCodeFromPlatfrom(),
        undefined,
        true,
        undefined
    )?.data

    const averageReviewByTime = HomeService.distribuzioneRecensioniPerData(
        allFilters,
        getNoCodeFromPlatfrom(),
        undefined,
        true
    )?.data

    console.log(
        '1: ',
        averageVotoByTime,
        ' 2: ',
        averageSentimentByTime,
        ' 3: ',
        averageReviewByTime
    )

    const distribuzioneRecensioniData =
        HomeService.getDistributionReccomandation(
            allFilters,
            ['tipo_raccomandazione'],
            'Date',
            getNoCodeFromPlatfrom(),
            true
        )

    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

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
                    {/*TODO: missing averageReviewByTime?.data?.totalFeedback*/}
                    <LineChart
                        dataReady={!averageReviewByTime}
                        color={ChartConfig.color.primary}
                        title={t('Numero di recensioni')}
                        styleCounter={styles.countUpReviews}
                        numberToShow={averageReviewByTime?.data?.reduce(
                            (acc: number, obj: any) => acc + obj?.value,
                            0
                        )}
                        contentPopover={t('NumeroRecensioniHelper')}
                        isRound={true}
                        label={t('Recensioni')}
                        chartdata={averageReviewByTime?.data}
                    />
                    <LineChart
                        dataReady={!averageVotoByTime}
                        title={t('Voto Medio')}
                        numberToShow={averageVotoByTime?.data?.tot}
                        contentPopover={t('VotoMedioHelper')}
                        label={t('Valutazioni')}
                        styleCounter={styles.countUpRatings}
                        chartdata={averageVotoByTime?.data?.values}
                        decimals={2}
                        textIcon={'star'}
                    />
                    <LineChart
                        dataReady={!averageSentimentByTime}
                        isSentiment={true}
                        title={t('Sentiment')}
                        numberToShowComponent={
                            <div className={styles.showComponentContainer}>
                                <TextContainer
                                    label={String(
                                        averageSentimentByTime?.data?.countPos
                                    )}
                                    customTextColor={'#34E0A1'}
                                    color={'#F1F1F1'}
                                    iconSvg={'radioSentiment.svg'}
                                    iconColor={'#34E0A1'}
                                    customIconHeight={24}
                                    customIconWidth={24}
                                    rightSideIcon={true}
                                    textSize={'h5'}
                                />
                                <TextContainer
                                    label={String(
                                        averageSentimentByTime?.data?.countNeg
                                    )}
                                    customTextColor={'#ff6960'}
                                    color={'#F1F1F1'}
                                    iconSvg={'radioSentiment.svg'}
                                    iconColor={'#FF608B'}
                                    customIconHeight={24}
                                    customIconWidth={24}
                                    rightSideIcon={true}
                                    textSize={'h5'}
                                />
                            </div>
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
