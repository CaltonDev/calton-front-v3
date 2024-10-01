import React, { useEffect } from 'react'
import Table from '../../components/Table/Table'
import FilterService from '../../services/FilterService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { PaginationState } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { RootState } from '../../store/store'
import FeedbackService from '../../services/FeedbackService'
import { SurveyRepliesProps } from './SurveyReplies.interface'

function SurveyReplies({
    data,
    sourceId,
    idColumns,
    isFromHome = false,
}: SurveyRepliesProps) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const search = useSelector((state: RootState) => state.Search.wordSearched)
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector(
        (state: RootState) => state.SelectedWords
    )?.data
    const { customFilters } = useSelector(selectAllFilters)

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
        isFromHome &&
            wordSelected &&
            wordSelected.sentiment && [
                ...customFilters,
                {
                    _id: null,
                    collection: 'feedback',
                    EP_config: null,
                    attribute: 'sentiment',
                    selectedCustom: [wordSelected.sentiment],
                },
            ]
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
        isFromHome &&
            wordSelected &&
            wordSelected.sentiment && [
                ...customFilters,
                {
                    _id: null,
                    collection: 'feedback',
                    EP_config: null,
                    attribute: 'sentiment',
                    selectedCustom: [wordSelected.sentiment],
                },
            ]
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

    return (
        <Table
            data={feedbacks?.all_feed?.feedback || []}
            columnsData={feedbacks?.all_feed?.columns || []}
            fullyLoaded={true}
            bottomNavigator={true}
            pagination={pagination}
            setPagination={setPagination}
        />
    )
}

export default SurveyReplies
