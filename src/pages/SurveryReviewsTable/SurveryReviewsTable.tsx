import React, { useEffect } from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { PaginationState } from '@tanstack/react-table'
import SourcesService from '../../services/SourcesService'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { RootState } from '../../store/store'
import FeedbackService from '../../services/FeedbackService'
import search from '../../store/search/search'

function SurveryReviewsTable() {
    const { t } = useTranslation()
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector(
        (state: RootState) => state.SelectedWords
    )?.data
    const { customFilters } = useSelector(selectAllFilters)

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    //TODO: check probably wordFilter should be removed
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
        false &&
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
        false &&
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
        <PageContainer>
            <PageHeader heading={t('Risposte')} subheading={true}></PageHeader>
            <Table
                data={feedbacks?.all_feed?.feedback || []}
                columnsData={feedbacks?.all_feed?.columns || []}
                fullyLoaded={true}
                bottomNavigator={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default SurveryReviewsTable
