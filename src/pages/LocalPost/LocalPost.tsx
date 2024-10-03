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
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const allFilters = useSelector(selectAllFilters)
    const [viewBy, setViewBy] = React.useState('listing')
    const count = ListingService.getCountOfItems({
        viewBy: viewBy,
        listingsName: allFilters?.selectedLocationListing,
    })?.data?.count
    const postsData = ListingService.getLocalPosts({
        viewBy: viewBy,
        listingsName: allFilters?.selectedLocationListing,
        skip: pagination.pageIndex * pagination.pageSize,
        limit: pagination.pageSize,
        returnAnt: true,
        nextPageToken: null,
        postsName: [],
        postsHash: [],
        returnLocations: false,
        startDate: null,
        endDate: null,
        fromCalendar: false,
    })?.data

    const handleToggle = (value: string) => {
        setViewBy(value ? 'listing' : 'post')
        setPagination({
            pageIndex: 0,
            pageSize: 10,
        })
    }

    return (
        <PageContainer>
            <PageHeader heading={t('Local posts')}></PageHeader>
            <Table
                data={postsData?.data}
                columnsData={postsData?.columns}
                fullyLoaded={false}
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
                    handleToggle,
                }}
                totalItems={count}
            />
        </PageContainer>
    )
}

export default LocalPost
