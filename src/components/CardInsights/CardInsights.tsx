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
    sourceId,
}: CardInsightsProps) {
    const { t } = useTranslation()
    const chipTopics = useSelector(
        (state: RootState) => state.AnalisiAvanzataState.chipTopics
    )
    const isRequired = title.startsWith('*')
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
            getRatingChartInfo(idColumns)
        } else if (chartType === 'sentiment') {
            getDistSentiment(idOriginal, idColumns)
        } else if (chartType === 'topic') {
            getDistTopicSentiment(idOriginal)
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
            getNpsChartInfo(idColumns)
        } else if (chartType === 'review') {
            getDistAnswers(idColumns)
        } else {
            if (type === 'yes_no' || type === 'multiple_choice') {
                getOtherChart(
                    idColumns,
                    type === 'multiple_choice',
                    type === 'yes_no'
                )
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
    ])

    const getRatingChartInfo = async (columnsSelected: any) => {
        try {
            setIsLoading(true)
            let response
            let response2
            let response3
            if (isExpanded) {
                ;[response, response2, response3] = await Promise.all([
                    AnalisiAvanzataService.getDistVotiPerData(
                        allFilters,
                        columnsSelected,
                        true,
                        'Date',
                        undefined,
                        false,
                        [localData._id]
                    ),
                    HomeService.getDistribuzioneVoti(
                        allFilters,
                        'Date',
                        columnsSelected,
                        true,
                        undefined,
                        undefined,
                        [localData._id]
                    ),
                    HomeService.getAverageByTime(
                        allFilters,
                        'rating',
                        undefined,
                        getNoCodeFromPlatfrom(),
                        idColumns,
                        true,
                        undefined,
                        [localData._id]
                    ),
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await AnalisiAvanzataService.getDistVotiPerData(
                    allFilters,
                    columnsSelected,
                    true,
                    'Date',
                    undefined,
                    undefined,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                response = await HomeService.getDistribuzioneVoti(
                    allFilters,
                    'Date',
                    columnsSelected,
                    true,
                    undefined,
                    undefined,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.mean
            ) {
                response = await HomeService.getAverageByTime(
                    allFilters,
                    'rating',
                    undefined,
                    getNoCodeFromPlatfrom(),
                    idColumns,
                    true,
                    undefined,
                    [localData._id]
                )
            }
            if (response.status === 200) {
                setIsLoading(false)
                if (isExpanded) {
                    setChildren([
                        <BarChartGrades
                            key={response2?.toString()}
                            response={response2}
                        />,
                        <MultiLineChart
                            key={response?.toString()}
                            response={response}
                        />,
                        <TinyMultiLineChart
                            key={response3?.toString()}
                            data={response3 ? response3.data?.data?.values : {}}
                            xField={'data'}
                            yField={'value'}
                            seriesField={''}
                            colorField={'value'}
                            colorFunction={3}
                            smooth={true}
                        />,
                    ])
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    setChildren(<MultiLineChart response={response} />)
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.standard
                ) {
                    setChildren(<BarChartGrades response={response} />)
                } else if (
                    chartTypeVisualization === CustomConstants.chartType.mean
                ) {
                    setChildren(
                        <>
                            <ChartHeader
                                // title={t("Sentiment")}
                                // contentPopover={t("SetimentHelper")}
                                dataReady={true}
                                numberToShow={response.data?.data?.tot}
                                decimals={2}
                            />
                            <TinyMultiLineChart
                                data={response.data?.data?.values}
                                xField={'data'}
                                yField={'value'}
                                seriesField={''}
                                colorField={'value'}
                                colorFunction={3}
                                smooth={true}
                            />
                        </>
                    )
                }
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: 'Non sono presenti dati per ' + title,
                    })
                )
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

    const getOtherChart = async (
        columnsSelected: any[],
        isMultiChoice = false,
        isYesNo = false
    ) => {
        try {
            setIsLoading(true)
            let response
            let response2
            if (isExpanded) {
                ;[response, response2] = await Promise.all([
                    AnalisiAvanzataService.getDistVotiPerData(
                        allFilters,
                        columnsSelected,
                        true,
                        'Date',
                        'isDataFeedback',
                        isMultiChoice,
                        [localData._id]
                    ),
                    HomeService.getCountCols(
                        allFilters,
                        'Date',
                        columnsSelected,
                        true,
                        undefined,
                        isMultiChoice,
                        [localData._id]
                    ),
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await AnalisiAvanzataService.getDistVotiPerData(
                    allFilters,
                    columnsSelected,
                    true,
                    'Date',
                    'isDataFeedback',
                    isMultiChoice,
                    [localData._id]
                )
                // response = await HomeService.getAverageByTime([localData._id], null, startDate, endDate, groupby, selectedChannel, undefined, selectedLocation, getNoCodeFromPlatfrom(), selectedTopics, customFilters, idColumns, false, isMultiChoice)
            } else {
                response = await HomeService.getCountCols(
                    allFilters,
                    'Date',
                    columnsSelected,
                    true,
                    undefined,
                    isMultiChoice,
                    [localData._id]
                )
            }

            if (response.status === 200) {
                if (isExpanded) {
                    setChildren([
                        <BarChartSentiment
                            key={response2?.toString()}
                            response={response2}
                        />,
                        <MultiLineChart
                            key={response?.toString()}
                            response={response}
                            isYesNo={false}
                        />,
                    ])
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    setChildren(
                        <MultiLineChart response={response} isYesNo={isYesNo} />
                    )
                } else {
                    setChildren(<BarChartSentiment response={response} />)
                }
                setIsLoading(false)
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Non sono presenti dati per ') + title,
                    })
                )
            }
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

    const getNpsChartInfo = async (columnsSelected: any[], colX = 'isNPS') => {
        try {
            setIsLoading(true)
            let response
            let response2
            let response3
            let response4
            if (isExpanded) {
                ;[response, response2, response3, response4] =
                    await Promise.all([
                        await HomeService.getDistribuzioneVoti(
                            allFilters,
                            'Date',
                            columnsSelected,
                            true,
                            colX,
                            undefined,
                            [localData._id]
                        ),
                        await AnalisiAvanzataService.getDistVotiPerData(
                            allFilters,
                            columnsSelected,
                            true,
                            colX,
                            undefined,
                            undefined,
                            [localData._id]
                        ),
                        await AnalisiAvanzataService.getDistribuzioneNps(
                            allFilters,
                            columnsSelected,
                            true,
                            [localData._id]
                        ),
                        await AnalisiAvanzataService.npsTempo(
                            allFilters,
                            columnsSelected,
                            true,
                            colX,
                            [localData._id]
                        ),
                    ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await AnalisiAvanzataService.getDistVotiPerData(
                    allFilters,
                    columnsSelected,
                    true,
                    colX,
                    undefined,
                    undefined,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                response = await HomeService.getDistribuzioneVoti(
                    allFilters,
                    'Date',
                    columnsSelected,
                    true,
                    colX,
                    undefined,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.mean
            ) {
                response = await AnalisiAvanzataService.getDistribuzioneNps(
                    allFilters,
                    columnsSelected,
                    true,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization ===
                CustomConstants.chartType.distribution
            ) {
                response = await AnalisiAvanzataService.npsTempo(
                    allFilters,
                    columnsSelected,
                    true,
                    colX,
                    [localData._id]
                )
            }
            if (response.status === 200) {
                setIsLoading(false)
                if (isExpanded) {
                    setChildren([
                        <BarChartNPS
                            key={response?.toString()}
                            response={response}
                        />,
                        <MultiLineChart
                            key={response2?.toString()}
                            response={response2}
                            isYesNo={false}
                        />,
                        <div
                            key={response?.toString()}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <HeaderNPS response={response3} />
                            <PieNPS response={response3} />
                        </div>,
                        <>
                            <BarChartNPSTime response={response4} />
                        </>,
                    ])
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    setChildren(
                        <MultiLineChart response={response} isYesNo={false} />
                    )
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.standard
                ) {
                    setChildren(<BarChartNPS response={response} />)
                } else if (
                    chartTypeVisualization === CustomConstants.chartType.mean
                ) {
                    setChildren(
                        <>
                            <HeaderNPS response={response} />
                            <PieNPS response={response} />
                        </>
                    )
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.distribution
                ) {
                    setChildren(
                        <>
                            <BarChartNPSTime response={response} />
                        </>
                    )
                }
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Non sono presenti dati per ') + title,
                    })
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
    }

    const getDistSentiment = async (
        columnsSelected: any[],
        idColumns: any[]
    ) => {
        try {
            setIsLoading(true)
            let response
            let response2
            if (isExpanded) {
                ;[response, response2] = await Promise.all([
                    HomeService.getAverageByTime(
                        allFilters,
                        'sentiment',
                        undefined,
                        getNoCodeFromPlatfrom(),
                        idColumns,
                        true,
                        undefined,
                        [localData._id]
                    ),
                    AnalisiAvanzataService.getDistSentiment(
                        allFilters,
                        columnsSelected,
                        true,
                        [localData._id]
                    ),
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await HomeService.getAverageByTime(
                    allFilters,
                    'sentiment',
                    undefined,
                    getNoCodeFromPlatfrom(),
                    idColumns,
                    true,
                    undefined,
                    [localData._id]
                )
            } else {
                response = await AnalisiAvanzataService.getDistSentiment(
                    allFilters,
                    columnsSelected,
                    true,
                    [localData._id]
                )
            }
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
            )

            const dateChart = (
                <TinyAreaChart
                    label={t('Sentiment')}
                    chartdata={response.data?.data?.data}
                />
            )

            if (response.status === 200) {
                if (isExpanded) {
                    setChildren([
                        <BarChartPos
                            key={response2?.toString()}
                            response={response2}
                        />,
                        <>
                            <ChartHeader
                                dataReady={true}
                                numberToShowComponent={
                                    response.data?.data?.countNeg
                                }
                                decimals={0}
                            />
                            {dateChart}
                        </>,
                    ])
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    //todo: check number to show component e countup
                    setChildren(
                        <>
                            <ChartHeader
                                dataReady={true}
                                numberToShowComponent={
                                    response.data?.data?.countPos
                                }
                                decimals={0}
                            />
                            {dateChart}
                        </>
                    )
                } else {
                    setChildren(<BarChartPos response={response} />)
                }
                setIsLoading(false)
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Non sono presenti dati per ') + title,
                    })
                )
            }
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
    )?.data?.data

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
    )?.data?.all_feed

    useEffect(() => {
        //wrong
        if (feedbackInfo) {
            setPagination({
                pageIndex: pagination.pageIndex,
                pageSize: 10,
            })
        }
    }, [feedbackInfo])

    const getDistAnswers = async (columnsSelected: any[]) => {
        try {
            setIsLoading(true)
            let response
            const table = (
                <Table
                    data={feedbacks?.all_feed?.feedback || []}
                    columnsData={feedbacks?.all_feed?.columns || []}
                    fullyLoaded={true}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            )
            if (isExpanded) {
                response = await HomeService.distribuzioneRecensioniPerData(
                    allFilters,
                    getNoCodeFromPlatfrom(),
                    columnsSelected,
                    false,
                    [localData._id]
                )
            } else if (
                chartTypeVisualization === CustomConstants.chartType.standard
            ) {
                setChildren(table)
            }
            if (isExpanded) {
                setChildren([
                    table,
                    <>
                        {getHeaderReview(response)}
                        {getGraphReview(response)}
                    </>,
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await HomeService.distribuzioneRecensioniPerData(
                    allFilters,
                    getNoCodeFromPlatfrom(),
                    columnsSelected,
                    false,
                    [localData._id]
                )
                if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    setChildren(
                        <>
                            {getHeaderReview(response)}
                            {getGraphReview(response)}
                        </>
                    )
                }
                setIsLoading(false)
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Non sono presenti dati per ') + title,
                    })
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

    const getDistTopicSentiment = async (columnsSelected: any[]) => {
        try {
            setIsLoading(true)
            let response
            let response2
            if (isExpanded) {
                ;[response, response2] = await Promise.all([
                    AnalisiAvanzataService.distTopicPerData(
                        allFilters,
                        columnsSelected,
                        false,
                        [localData._id]
                    ),
                    AnalisiAvanzataService.getDistTopicSentiment(
                        allFilters,
                        columnsSelected,
                        [localData._id]
                    ),
                ])
            } else if (
                chartTypeVisualization === CustomConstants.chartType.absolute
            ) {
                response = await AnalisiAvanzataService.distTopicPerData(
                    allFilters,
                    columnsSelected,
                    false,
                    [localData._id]
                )
            } else {
                response = await AnalisiAvanzataService.getDistTopicSentiment(
                    allFilters,
                    columnsSelected,
                    [localData._id]
                )
            }

            if (response.status === 200) {
                const stacked = (
                    <StackedBarChart
                        chipTopics={chipTopics}
                        data={response2?.data?.data}
                        showPercentage={false}
                    />
                )
                const line = (
                    <LineChartAnalisi
                        chipTopics={chipTopics}
                        data={response.data?.data}
                    />
                )
                if (isExpanded) {
                    setChildren([stacked, line])
                } else if (
                    chartTypeVisualization ===
                    CustomConstants.chartType.absolute
                ) {
                    setChildren(line)
                } else {
                    setChildren(stacked)
                }
                setIsLoading(false)
            } else {
                setChildren(<div>{t('Nessun dato da visualizzare')}</div>)
                setIsLoading(false)
                dispatch(
                    showToast({
                        type: 2,
                        text: t('Non sono presenti dati per ') + title,
                    })
                )
            }
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
                </div>
            </div>
            {footer && <p>{footer}</p>}
        </div>
    )
}

export default CardInsights
