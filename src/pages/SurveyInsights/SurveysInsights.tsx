import styles from './SurveysInsights.module.scss'
import React, { useEffect, useState } from 'react'
import { SurveyInsightsProps } from './SurveysInsights.interface'
import HomeService from '../../services/HomeService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import CardInsights from '../../components/CardInsights/CardInsights'
function SurveysInsights({ id }: SurveyInsightsProps) {
    const allFilters = useSelector(selectAllFilters)
    const localData = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        [id]
    )?.data

    const colsToAvoid = ['data_inizio_risposta', 'data_risposta', 'durata']
    const columns =
        Array.isArray(localData?.data) && localData?.data?.length > 0
            ? localData?.data[0]?.columns
            : []

    const [chartConfig, setChartConfig] = useState(
        columns.reduce(function (result: any, el: any, idx: number) {
            if (!colsToAvoid.includes(el.name)) {
                let chartType = ''
                let title = ''
                let idOriginal = ''
                if (el?.isRating) {
                    chartType = 'rating'
                    title = el.name
                } else if (el?.isSentiment) {
                    chartType = 'sentiment'
                    const analCol = el.name.split('Sent_')[1]
                    title = 'Sentiment "' + analCol + '"'
                    idOriginal = columns.find(
                        (elm: any) => elm?.toAnalyse && elm?.name === analCol
                    )?.id
                } else if (el?.isTopic) {
                    chartType = 'topic'
                    const analCol = el.name.split('topics_')[1]
                    title = 'Topic "' + analCol + '"'
                    idOriginal = columns.find(
                        (elm: any) => elm?.toAnalyse && elm?.name === analCol
                    )?.id
                } else if (el?.toAnalyse) {
                    chartType = 'review'
                    title = el.name
                } else if (el?.isNPS) {
                    chartType = 'nps'
                    title = el.name
                } else {
                    title = el.name
                }
                result.push({
                    id: el.id,
                    idx: idx,
                    title: title,
                    chartType: chartType,
                    type: el.type,
                    varsType: el?.varsType,
                    isLoading: true,
                    idOriginal: idOriginal,
                })
            }
            return result
        }, [])
    )

    useEffect(() => {
        setChartConfig(
            columns.reduce(function (result: any, el: any, idx: number) {
                if (!colsToAvoid.includes(el.name)) {
                    let chartType = ''
                    let title = ''
                    let idOriginal = ''
                    if (el?.isRating) {
                        chartType = 'rating'
                        title = el.name
                    } else if (el?.isSentiment) {
                        chartType = 'sentiment'
                        const analCol = el.name.split('Sent_')[1]
                        title = 'Sentiment "' + analCol + '"'
                        idOriginal = columns.find(
                            (elm: any) =>
                                elm?.toAnalyse && elm?.name === analCol
                        )?.id
                    } else if (el?.isTopic) {
                        chartType = 'topic'
                        const analCol = el.name.split('topics_')[1]
                        title = 'Topic "' + analCol + '"'
                        idOriginal = columns.find(
                            (elm: any) =>
                                elm?.toAnalyse && elm?.name === analCol
                        )?.id
                    } else if (el?.toAnalyse) {
                        chartType = 'review'
                        title = el.name
                    } else if (el?.isNPS) {
                        chartType = 'nps'
                        title = el.name
                    } else {
                        title = el.name
                    }
                    result.push({
                        id: el.id,
                        idx: idx,
                        title: title,
                        chartType: chartType,
                        type: el.type,
                        varsType: el?.varsType,
                        isLoading: true,
                        idOriginal: idOriginal,
                    })
                }
                return result
            }, [])
        )
    }, [localData])

    return (
        <div className={styles.containerCards} key={0}>
            {chartConfig &&
                chartConfig.map((el: any, ind: number) => {
                    return (
                        <CardInsights
                            sourceId={id ? [id] : undefined}
                            key={ind}
                            idx={el?.idx}
                            title={el.title}
                            chartType={el.chartType}
                            footer={el?.footer}
                            localData={localData}
                            idColumns={[el?.id]}
                            idOriginal={[el?.idOriginal]}
                            type={el?.type}
                        />
                    )
                })}
        </div>
    )
}

export default SurveysInsights
