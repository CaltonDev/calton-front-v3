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
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'

function SurveyReplies({
    sourceId,
    idColumns,
    isFromHome = false,
}: SurveyRepliesProps) {
    const { t } = useTranslation()
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
            {isFromHome ? (
                <PageContainer>
                    <PageHeader
                        heading={t('Risposte')}
                        subheading={true}
                    ></PageHeader>
                    <Table
                        data={feedbacks?.data?.feedback || []}
                        columnsData={feedbacks?.data?.columns || []}
                        fullyLoaded={true}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </PageContainer>
            ) : (
                <Table
                    data={feedbacks?.data?.feedback || []}
                    columnsData={feedbacks?.data?.columns || []}
                    fullyLoaded={true}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            )}
        </>
    )
}

export default SurveyReplies
