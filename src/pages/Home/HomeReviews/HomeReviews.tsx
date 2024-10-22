import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import styles from './HomeReviews.module.scss'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import LineChart from '../../../components/Charts/LineChart/LineChart'
import ChartConfig from '../../../constants/ChartConfig'
import InfoCardViewer from '../../../components/InfoCardViewer/InfoCardViewer'
import TextContainer from '../../../components/TextContainer/TextContainer'
import HomeService from '../../../services/HomeService'
import Tabs from '../../../components/TabsComponent/Tabs'
import CollapsableCard from '../../../components/CollapsableCard/CollapsableCard'
import DistributionRatingsGraph from '../../../components/Graphs/DistributionRatingsGraph/DistributionRatingsGraph'
import { saveAs } from 'file-saver'
import BubbleChartHome from '../../../components/Charts/BubbleCharts/BubbleChartHome/BubbleChartHome'
import TableSelector from '../../../components/TableSelector/TableSelector'
import FilterService from '../../../services/FilterService'

function HomeReviews() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector((state: RootState) => state.SelectedWords)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const isCompact = useSelector(
        (state: RootState) => state.Settings.showNumbers
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

    const sources = useSelector((state: RootState) => state.Source)

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
    )?.data

    const sourcesHomeData = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        undefined,
        undefined,
        undefined,
        true,
        true
    )?.data

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

    const distribuzioneVoti = HomeService.getDistribuzioneVoti(
        allFilters,
        'Date',
        undefined,
        true,
        undefined,
        !isCompact
    )

    const distribuzioneRecensioniData =
        HomeService.getDistributionReccomandation(
            allFilters,
            ['tipo_raccomandazione'],
            'Date',
            getNoCodeFromPlatfrom(),
            true
        )?.data

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

    const buttonList = [t('Voti'), t('Raccomandazioni')]

    const saveCanvas = () => {
        const divElement = document.getElementById('Distribuzione Dei Voti')
        let canvasSave
        if (divElement) canvasSave = divElement.querySelector('canvas')

        if (canvasSave) {
            const canvas = canvasSave as HTMLCanvasElement
            canvas.toBlob(function (blob) {
                saveAs(blob ? blob : '', 'distributionRatings.png')
            })
        }
    }

    const locationData = FilterService.getLocationsFiltered(
        getNoCodeFromPlatfrom(),
        true
    )?.data

    const tableSelectorData = [
        {
            key: 'luoghi',
            label: t('Luoghi'),
            data: locationData,
            svg: 'location.svg',
        },
        {
            key: 'canali',
            label: t('Canali'),
            data: {},
            svg: 'channels.svg',
        },
        {
            key: 'fonti',
            label: t('Fonti'),
            data: sourcesHomeData,
            svg: 'Topic.svg',
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
                                    customIconHeight={20}
                                    customIconWidth={20}
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
                                    customIconHeight={20}
                                    customIconWidth={20}
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
                <div className={styles.rowHome}>
                    <TableSelector
                        data={tableSelectorData}
                        fullyLoaded={true}
                        onDownload={saveCanvas}
                        downloadble={true}
                    />
                    <CollapsableCard
                        colClasses={styles.myWidth}
                        heading={t('Distribuzione Dei Voti')}
                        collapsible={false}
                        reloadable={false}
                        downloadble={true}
                        onDownload={saveCanvas}
                        closeable={false}
                        isAnt={true}
                        width={'32.5%'}
                    >
                        <div>
                            <Tabs buttons={buttonList}>
                                <div
                                    key="tab-1"
                                    className={styles.myContainerTab}
                                >
                                    <DistributionRatingsGraph
                                        dataReady={!distribuzioneVoti.isLoading}
                                        chartdata={distribuzioneVoti?.data}
                                    />
                                </div>
                                <div
                                    key="tab-2"
                                    className={styles.myContainerTab}
                                >
                                    <DistributionRatingsGraph
                                        /*backgroundColor={[
                                            ChartConfig.color.negative,
                                            ChartConfig.color.positive,
                                        ]}*/
                                        dataReady={!distribuzioneRecensioniData}
                                        isReccomend={true}
                                        chartdata={
                                            distribuzioneRecensioniData?.data
                                        }
                                    />
                                </div>
                            </Tabs>
                        </div>
                    </CollapsableCard>
                </div>
                <div className={styles.rowHome}>
                    {
                        <BubbleChartHome
                            dataReady={bubbleData?.data}
                            bubbles={bubbleData?.data}
                            heading={t('Word Cloud')}
                        />
                    }
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeReviews
