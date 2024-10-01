import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import ListingService from '../../services/ListingService'
import { PaginationState } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'

function LocalPost() {
    const { t } = useTranslation()
    const { selectedLocationListing } = useSelector(selectAllFilters)
    const [viewBy, setViewBy] = React.useState('listing')
    const postsData = ListingService.getLocalPostsData(
        viewBy,
        selectedLocationListing
    )?.data
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader heading={t('Local posts')}></PageHeader>
            <Table
                data={postsData?.data}
                columnsData={postsData?.columns}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
                bottomNavigator={false}
                customToggleButton={{
                    leftValue: {
                        label: 'Places',
                        value: 'listing',
                    },
                    rightValue: {
                        label: 'Post',
                        value: 'post',
                    },
                    currentState: viewBy,
                    handleToggle: (value) => {
                        setViewBy(value ? 'listing' : 'post')
                    },
                }}
            />
        </PageContainer>
    )
}

export default LocalPost
