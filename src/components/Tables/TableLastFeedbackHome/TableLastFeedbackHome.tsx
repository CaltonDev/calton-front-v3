import styles from './TableLastFeedbackHome.module.scss'
import React, { useEffect } from 'react'
import ChartConfig from '../../../constants/ChartConfig'
import AppConfig from '../../../constants/AppConfig'
import HeaderSelectedWord from './HeaderSelectedWord/HeaderSelectedWord'
import { useTranslation } from 'react-i18next'
//import ReviewTable from '../ReviewTable/ReviewTable'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import { TableLastFeedbackHomeProps } from './TableLastFeedbackHome.interface'
import Table from '../../Table/Table'
import FeedbackService from '../../../services/FeedbackService'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import search from '../../../store/search/search'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { RootState } from '../../../store/store'
import { PaginationState } from '@tanstack/react-table'

function TableLastFeedbackHome({
    dataReady,
    word,
    countFeed,
    sentiment,
}: TableLastFeedbackHomeProps) {
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector(
        (state: RootState) => state.SelectedWords
    )?.data
    const { customFilters } = useSelector(selectAllFilters)

    const color =
        sentiment == 1
            ? ChartConfig.color.positive
            : sentiment == -1
              ? ChartConfig.color.negative
              : AppConfig.themeColors.primary

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const feedbackInfo = FeedbackService.getInfoFeedbacks(
        [],
        allFilters,
        undefined,
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
        wordSelected &&
            wordSelected.sentiment && [
                ...customFilters,
                {
                    _id: null,
                    collection: 'feedback',
                    EP_config: null,
                    attribute: 'sentiment',
                    selectedCustom: [wordSelected.sentiment], //todo: chiedere a davide
                },
            ]
    )?.data

    const feedbacks = FeedbackService.getFeedbacks(
        [],
        allFilters,
        undefined,
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
        wordSelected &&
            wordSelected.sentiment && [
                ...customFilters,
                {
                    _id: null,
                    collection: 'feedback',
                    EP_config: null,
                    attribute: 'sentiment',
                    //selectedCustom: [parseInt(wordSelected.sentiment)], //todo: chiedere a davide
                },
            ]
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

    return (
        <>
            {dataReady ? (
                <>
                    {word && (
                        <HeaderSelectedWord
                            word={word}
                            color={color}
                            countFeed={countFeed}
                        />
                    )}
                    <Table
                        data={feedbacks?.all_feed?.feedback || []}
                        columnsData={feedbacks?.all_feed?.columns || []}
                        fullyLoaded={true}
                        bottomNavigator={true}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </>
            ) : (
                <div className="sales-chart-wrap">
                    <div className="col-sm" style={{ marginTop: 30 }}>
                        {/*<LoaderChart type={'tableLastFeedbackHome'} />*/}
                    </div>
                </div>
            )}
        </>
    )
}

export default TableLastFeedbackHome
