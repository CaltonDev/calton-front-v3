import styles from './CardInsights.module.scss'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StackedBarChart from '../Charts/StackedBarChart/StackedBarChart'
//todo: add review table here
//import ReviewTable from '../../pages/InsightsSurvey/ReviewTable/ReviewTable'
import HomeService from '../../services/HomeService'
import { showToast } from '../../store/toast/errorToastSlice'
import AnalisiAvanzataService from '../../services/AnalisiAvanzataService'
import count from '../../assets/img/count.svg'
import multicount from '../../assets/img/multicount.svg'
import distribuzione from '../../assets/img/distribuzione.svg'
import distribuzionePie from '../../assets/img/distribuzionePie.svg'
import nps from '../../assets/img/nps.svg'
import LineChartAnalisi from '../Charts/LineChartAnalisi/LineChartAnalisi'
import { getNoCodeFromPlatfrom, hexToRgbA } from '../../helpers/helpers'
import ChartConfig from '../../constants/ChartConfig'
import TinyAreaChart from '../Charts/TinyAreaCharts/TinyAreaChart/TinyAreaChart'
import CountUp from 'react-countup'
import ChartHeader from '../Charts/ChartHeader/ChartHeader'
import expand from '../../assets/img/expand.png'
import reduce from '../../assets/img/reduce.png'
import LoaderChart from './LoaderChart/LoaderChart'
import DropdownButton from './DropdownButton/DropdownButton'
import CustomConstants from '../../constants/CustomConstants'
import HeaderNPS from './HeaderNPS/HeaderNPS'
import PieNPS from './PieNPS/PieNPS'
import BarChartNPS from './BarChartNPS/BarChartNPS'
import BarChartNPSTime from './BarChartNPSTime/BarChartNPSTime'
import BarChartPos from './BarChartPos/BarChartPos'
import BarChartSentiment from './BarChartSentiment/BarChartPos'
import MultiLineChart from './MultiLineChart/MultiLineChart'
import BarChartGrades from './BarChartGrades/BarChartGrades'
import TinyMultiLineChart from '../Charts/TinyAreaCharts/TinyMultiLineChart/TinyMultiLineChart'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { CardInsightsProps } from './CardInsights.interface'
import { RootState } from '../../store/store'
import Table from '../Table/Table'
import FeedbackService from '../../services/FeedbackService'
import { PaginationState } from '@tanstack/react-table'

function CardInsights({
    title,
    chartType,
    footer,
    idx,
    localData,
    idColumns,
    idOriginal,
    type,
    sourceId = [''],
}: CardInsightsProps) {
    const { t } = useTranslation()
    const chipTopics = useSelector(
        (state: RootState) => state.AnalisiAvanzataState.chipTopics
    )
    const isRequired = title?.startsWith('*')
    const [isLoading, setIsLoading] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false)
    const [chartTypeVisualization, setChartTypeVisualization] = useState(
        CustomConstants.chartType.standard
    )
    const [children, setChildren] = useState<any>()
    const [configDropDown, setConfigDropDown] = useState([
        {
            name: t('Distribuzione risposte'),
            icon: distribuzione,
            key: CustomConstants.chartType.standard,
        },
        {
            name: t('Count tempo'),
            icon: multicount,
            key: CustomConstants.chartType.absolute,
        },
    ])
    const dispatch = useDispatch()
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        groupby,
        selectedTopics,
        customFilters,
        selectedProducts,
        selectedSource,
    } = useSelector(selectAllFilters)
    const allFilters = useSelector(selectAllFilters)

    const ratingChartInfoDistVotiPerData =
        AnalisiAvanzataService.getDistVotiPerData(
            allFilters,
            idColumns,
            true,
            'Date',
            undefined,
            false,
            sourceId
        )?.data

    const ratingChartInfoGetDistribuzioneVoti =
        HomeService.getDistribuzioneVoti(
            allFilters,
            'Date',
            idColumns,
            true,
            undefined,
            undefined,
            sourceId
        )?.data

    const ratingChartInfoGetAverageByTime = HomeService.getAverageByTime(
        allFilters,
        'rating',
        undefined,
        getNoCodeFromPlatfrom(),
        idColumns,
        true,
        undefined,
        sourceId
    )?.data

    const distSentimentGetAverageByTime = HomeService.getAverageByTime(
        allFilters,
        'sentiment',
        undefined,
        getNoCodeFromPlatfrom(),
        idColumns,
        true,
        undefined,
        sourceId
    )?.data

    const distSentimentGetDistSentiment =
        AnalisiAvanzataService.getDistSentiment(
            allFilters,
            idOriginal,
            true,
            sourceId
        )?.data

    const distTopicSentimentDistTopicPerData =
        AnalisiAvanzataService.distTopicPerData(
            allFilters,
            idOriginal,
            false,
            sourceId
        )?.data

    const distTopicSentimentGetDistTopicSentiment =
        AnalisiAvanzataService.getDistTopicSentiment(
            allFilters,
            idOriginal,
            sourceId
        )?.data

    /*const npsChartInfoGetDistribuzioneVoti = HomeService.getDistribuzioneVoti(
        allFilters,
        'Date',
        idColumns,
        true,
        'isNPS',
        undefined,
        sourceId
    )?.data*/

    const npsChartInfoGetDistVotiPerData =
        AnalisiAvanzataService.getDistVotiPerData(
            allFilters,
            idColumns,
            true,
            'isNPS',
            undefined,
            undefined,
            sourceId
        )?.data

    const npsChartInfoGetDistribuzioneNps =
        AnalisiAvanzataService.getDistribuzioneNps(
            allFilters,
            idOriginal,
            true,
            sourceId
        )?.data

    const npsChartInfoNPSTempo = AnalisiAvanzataService.npsTempo(
        allFilters,
        idOriginal,
        true,
        'isNPS',
        sourceId
    )?.data

    const distAnswersRecensioniPerData =
        HomeService.distribuzioneRecensioniPerData(
            allFilters,
            getNoCodeFromPlatfrom(),
            idColumns,
            false,
            sourceId
        )?.data

    const otherChartGetDistVotiPerData =
        AnalisiAvanzataService.getDistVotiPerData(
            allFilters,
            idColumns,
            true,
            'Date',
            'isDataFeedback',
            type === 'multiple_choice',
            sourceId
        )?.data

    const otherChartGetCountCols = HomeService.getCountCols(
        allFilters,
        'Date',
        idColumns,
        true,
        undefined,
        type === 'multiple_choice',
        sourceId
    )?.data

    useEffect(() => {
        if (chartType === 'rating') {
            if (configDropDown.length === 2) {
                const tmpConf = configDropDown
                tmpConf.push({
                    name: t('Media nel tempo'),
                    icon: count,
                    key: CustomConstants.chartType.mean,
                })
                setConfigDropDown(tmpConf)
            }
            getRatingChartInfo()
        } else if (chartType === 'sentiment') {
            //getDistSentiment()
        } else if (chartType === 'topic') {
            //getDistTopicSentiment()
        } else if (chartType === 'nps') {
            if (configDropDown.length === 2) {
                const tmpConf = configDropDown
                tmpConf.push(
                    {
                        name: t('Distribuzione clienti'),
                        icon: distribuzionePie,
                        key: CustomConstants.chartType.mean,
                    },
                    {
                        name: t('Distribuzione clienti nel tempo'),
                        icon: nps,
                        key: CustomConstants.chartType.distribution,
                    }
                )
                setConfigDropDown(tmpConf)
            }
            //getNpsChartInfo()
        } else if (chartType === 'review') {
            //getDistAnswers()
        } else {
            if (type === 'yes_no' || type === 'multiple_choice') {
                //getOtherChart()
            }
        }
    }, [
        startDate,
        endDate,
        selectedChannel,
        selectedLocation,
        selectedTopics,
        customFilters,
        selectedSource,
        selectedProducts,
        chartTypeVisualization,
        isExpanded,
        ratingChartInfoGetAverageByTime,
        ratingChartInfoGetDistribuzioneVoti,
        ratingChartInfoDistVotiPerData,
    ])

    const getRatingChartInfo = () => {
        try {
            console.log(
                'ratingChartInfoGetDistribuzioneVoti: ',
                ratingChartInfoGetDistribuzioneVoti
            )
            if (isExpanded) {
                /*setChildren([
                    <BarChartGrades
                        key={ratingChartInfoGetDistribuzioneVoti?.toString()}
                        response={
                            ratingChartInfoGetDistribuzioneVoti
                                ? ratingChartInfoGetDistribuzioneVoti
                                : []
                        }
                    />,
                    {

                    <MultiLineChart
                        key={ratingChartInfoDistVotiPerData?.toString()}
                        response={
                            ratingChartInfoDistVotiPerData
                                ? ratingChartInfoDistVotiPerData
                                : []
                        }
                    />,
                    <TinyMultiLineChart
                        key={ratingChartInfoGetAverageByTime?.toString()}
                        data={
                            ratingChartInfoGetAverageByTime
                                ? ratingChartInfoGetAverageByTime?.data?.values
                                : []
                        }
                        xField={'data'}
                        yField={'value'}
                        seriesField={''}
                        colorField={'value'}
                        colorFunction={3}
                        smooth={true}
                    />,

                    },
                ])*/
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                /*setChildren(
                    <MultiLineChart
                        response={
                            ratingChartInfoDistVotiPerData
                                ? ratingChartInfoDistVotiPerData
                                : []
                        }
                    />
                )*/
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                setChildren(
                    <BarChartGrades
                        response={
                            ratingChartInfoGetDistribuzioneVoti
                                ? ratingChartInfoGetDistribuzioneVoti
                                : []
                        }
                    />
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.mean
            ) {
                /*setChildren(
                    <>
                        <ChartHeader
                            // title={t("Sentiment")}
                            // contentPopover={t("SetimentHelper")}
                            dataReady={true}
                            numberToShow={
                                ratingChartInfoGetAverageByTime?.data?.tot
                            }
                            decimals={2}
                        />
                        <TinyMultiLineChart
                            data={
                                ratingChartInfoGetAverageByTime
                                    ? ratingChartInfoGetAverageByTime?.data
                                          ?.values
                                    : []
                            }
                            xField={'data'}
                            yField={'value'}
                            seriesField={''}
                            colorField={'value'}
                            colorFunction={3}
                            smooth={true}
                        />
                    </>
                )*/
            }
        } catch (e) {
            console.log(e)
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: 'Impossibile ottenere dati per ' + title,
                })
            )
        }
    }

    const getOtherChart = () => {
        try {
            setIsLoading(true)

            if (isExpanded) {
                setChildren([
                    <BarChartSentiment
                        key={otherChartGetCountCols.toString()}
                        response={otherChartGetCountCols}
                    />,
                    <MultiLineChart
                        key={otherChartGetDistVotiPerData?.toString()}
                        response={otherChartGetDistVotiPerData}
                        isYesNo={false}
                    />,
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                setChildren(
                    <MultiLineChart
                        response={otherChartGetDistVotiPerData}
                        isYesNo={type === 'yes_no'}
                    />
                )
            } else {
                setChildren(
                    <BarChartSentiment response={otherChartGetCountCols} />
                )
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere dati per ') + title,
                })
            )
        }
    }

    /*const getNpsChartInfo = () => {
        try {
            setIsLoading(true)

            setIsLoading(false)
            if (isExpanded) {
                setChildren([
                    <BarChartNPS
                        key={npsChartInfoGetDistribuzioneVoti?.toString()}
                        response={npsChartInfoGetDistribuzioneVoti}
                    />,
                    <MultiLineChart
                        key={npsChartInfoGetDistVotiPerData?.toString()}
                        response={npsChartInfoGetDistVotiPerData}
                        isYesNo={false}
                    />,
                    <div
                        key={npsChartInfoGetDistribuzioneVoti?.toString()}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                        }}
                    >
                        <HeaderNPS response={npsChartInfoGetDistribuzioneNps} />
                        <PieNPS response={npsChartInfoGetDistribuzioneNps} />
                    </div>,
                    <>
                        <BarChartNPSTime response={npsChartInfoNPSTempo} />
                    </>,
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                setChildren(
                    <MultiLineChart
                        response={npsChartInfoGetDistVotiPerData}
                        isYesNo={false}
                    />
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                setChildren(
                    <BarChartNPS response={npsChartInfoGetDistribuzioneVoti} />
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.mean
            ) {
                setChildren(
                    <>
                        <HeaderNPS response={npsChartInfoGetDistribuzioneNps} />
                        <PieNPS response={npsChartInfoGetDistribuzioneNps} />
                    </>
                )
            } else if (
                chartTypeVisualization ===
                CustomConstants.chartType.distribution
            ) {
                setChildren(
                    <>
                        <BarChartNPSTime response={npsChartInfoNPSTempo} />
                    </>
                )
            }
        } catch (e) {
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere dati per ') + title,
                })
            )
        }
    }*/

    const getDistSentiment = () => {
        try {
            /*TODO: check if necessary
            const countsUp = (
                <>
                    <CountUp
                        separator=","
                        className={styles.countUpPos}
                        start={0}
                        end={response.data?.data?.countPos}
                        duration={3}
                        decimals={0}
                        useEasing={true}
                    />
                    <CountUp
                        separator=","
                        className={styles.countUpNeg}
                        start={0}
                        end={response.data?.data?.countNeg}
                        duration={3}
                        decimals={0}
                        useEasing={true}
                    />
                </>
            )*/

            const dateChart = (
                <TinyAreaChart
                    label={t('Sentiment')}
                    chartdata={
                        chartTypeVisualization !==
                            CustomConstants.chartType.absolute || !isExpanded
                            ? distSentimentGetDistSentiment?.data
                            : distSentimentGetAverageByTime?.data
                    }
                />
            )

            if (isExpanded) {
                setChildren([
                    <BarChartPos
                        key={distSentimentGetDistSentiment?.toString()}
                        response={distSentimentGetDistSentiment}
                    />,
                    <>
                        <ChartHeader
                            dataReady={true}
                            numberToShowComponent={
                                distSentimentGetAverageByTime?.data?.countNeg
                            }
                            decimals={0}
                        />
                        {dateChart}
                    </>,
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                //todo: check number to show component e countup
                setChildren(
                    <>
                        <ChartHeader
                            dataReady={true}
                            numberToShowComponent={
                                distSentimentGetAverageByTime?.data?.countPos
                            }
                            decimals={0}
                        />
                        {dateChart}
                    </>
                )
            } else {
                setChildren(
                    <BarChartPos response={distSentimentGetAverageByTime} />
                )
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere dati per ') + title,
                })
            )
        }
    }

    const getHeaderReview = (response: any) => {
        return (
            <ChartHeader
                dataReady={true}
                numberToShow={response?.data?.totalFeedback || 0}
                decimals={0}
            />
        )
    }

    const getGraphReview = (response: any) => {
        return (
            <TinyAreaChart
                label={t('Recensioni')}
                chartdata={
                    response?.data?.data?.length > 0
                        ? response?.data?.data[1]
                        : []
                }
                borderColor={hexToRgbA(ChartConfig.color.primary, 3)}
            />
        )
    }

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const search = useSelector((state: RootState) => state.Search.wordSearched)
    const wordSelected = useSelector(
        (state: RootState) => state.SelectedWords
    )?.data

    const feedbackInfo = FeedbackService.getInfoFeedbacks(
        sourceId,
        allFilters,
        idColumns ? idColumns : undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        true,
        'xlsx',
        true,
        undefined,
        null,
        wordSelected?.word || null,
        true,
        false
    )?.data

    const feedbacks = FeedbackService.getFeedbacks(
        sourceId,
        allFilters,
        idColumns ? idColumns : undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        true,
        'xlsx',
        true,
        undefined,
        null,
        wordSelected?.word || null,
        true,
        false
    )?.data

    useEffect(() => {
        //wrong
        if (feedbackInfo) {
            setPagination({
                pageIndex: pagination.pageIndex,
                pageSize: 10,
            })
        }
    }, [feedbackInfo])

    const getDistAnswers = () => {
        try {
            setIsLoading(true)
            const table = (
                <Table
                    data={feedbacks?.data?.feedback || []}
                    columnsData={feedbacks?.data?.columns || []}
                    fullyLoaded={true}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            )
            if (isExpanded) {
                setChildren([
                    table,
                    <>
                        {getHeaderReview(distAnswersRecensioniPerData)}
                        {getGraphReview(distAnswersRecensioniPerData)}
                    </>,
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                setChildren(table)
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                setChildren(
                    <>
                        {getHeaderReview(distAnswersRecensioniPerData)}
                        {getGraphReview(distAnswersRecensioniPerData)}
                    </>
                )
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere dati per ') + title,
                })
            )
        }
    }

    const getDistTopicSentiment = () => {
        try {
            setIsLoading(true)

            const stacked = (
                <StackedBarChart
                    chipTopics={chipTopics}
                    data={distTopicSentimentGetDistTopicSentiment?.data}
                    showPercentage={false}
                />
            )
            const line = (
                <LineChartAnalisi
                    chipTopics={chipTopics}
                    data={distTopicSentimentDistTopicPerData?.data}
                />
            )
            if (isExpanded) {
                setChildren([stacked, line])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                setChildren(line)
            } else {
                setChildren(stacked)
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setChildren(<div>Errore</div>)
            setIsLoading(false)
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere dati per ') + title,
                })
            )
        }
    }

    const changeValue = (key: any) => {
        setChartTypeVisualization(key)
    }

    return (
        <div style={{ marginTop: 30 }} key={idx}>
            <div
                className={
                    !isExpanded
                        ? styles.card
                        : children?.length === 2
                          ? styles.card + ' ' + styles.card2
                          : children?.length > 2
                            ? styles.card + ' ' + styles.card4
                            : styles.card + ' ' + styles.card2
                }
            >
                <div className={styles.divTitle}>
                    <div className={styles.headerCard}>
                        {isRequired ? title.replaceAll('*', '') : title}
                        {isRequired ? (
                            <span>{t('Obbligatoria')}</span>
                        ) : (
                            <span>{t('Opzionale')}</span>
                        )}
                    </div>

                    <div className={styles.containerIcons}>
                        {!isExpanded && (
                            <div className={styles.smallButton}>
                                <DropdownButton
                                    config={configDropDown}
                                    onChange={changeValue}
                                />
                            </div>
                        )}
                        {isExpanded ? (
                            <img
                                onClick={() => {
                                    setChartTypeVisualization(
                                        CustomConstants.chartType.standard
                                    )
                                    setIsExpanded(false)
                                }}
                                className={styles.iconBigSmall}
                                height={15}
                                src={reduce}
                                alt=""
                            />
                        ) : (
                            <img
                                onClick={() => setIsExpanded(true)}
                                className={styles.iconBigSmall}
                                height={15}
                                src={expand}
                                alt=""
                            />
                        )}
                    </div>
                </div>
                <div
                    className={
                        !isExpanded ? styles.paperCard : styles.bigPaperCard
                    }
                >
                    {/*isLoading && chartType !== 'review' ? (
                        isExpanded ? (
                            <div style={{ display: 'flex' }}>
                                {[2, 2].map((elm, index) => (
                                    <LoaderChart
                                        key={index}
                                        line={index % 2 !== 0 ? 'line' : ''}
                                    />
                                ))}
                            </div>
                        ) : (
                            <LoaderChart
                                line={
                                    chartTypeVisualization ===
                                    CustomConstants.chartType.absolute
                                        ? 'line'
                                        : ''
                                }
                            />
                        )
                    ) : Array.isArray(children) ? (
                        children?.map((elm, index) => (
                            <div
                                key={index}
                                style={{ width: '47%', display: 'flex' }}
                            >
                                {elm}
                            </div>
                        ))
                    ) : (
                        children
                    )*/}
                    {Array.isArray(children)
                        ? children?.map((elm, index) => (
                              <div
                                  key={index}
                                  style={{ width: '47%', display: 'flex' }}
                              >
                                  {elm}
                              </div>
                          ))
                        : children}
                </div>
            </div>
            {footer && <p>{footer}</p>}
        </div>
    )
}

export default CardInsights
