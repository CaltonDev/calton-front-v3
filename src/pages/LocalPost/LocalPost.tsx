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
    const [skip, setSkip] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const allFilters = useSelector(selectAllFilters)
    const [viewBy, setViewBy] = React.useState('listing')
    const count = ListingService.getCountOfItems({
        viewBy: viewBy,
        listingsName: allFilters?.selectedLocationListing,
    })?.data?.count
    const postsData = ListingService.getLocalPosts({
        viewBy: viewBy,
        listingsName: allFilters?.selectedLocationListing,
        skip,
        limit,
        returnAnt: true,
        nextPageToken: null,
        postsName: [],
        postsHash: [],
        returnLocations: false,
        startDate: null,
        endDate: null,
        fromCalendar: false,
    })?.data
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: skip,
        pageSize: limit,
    })

    const handleChangePagination = (pageIndex: number, pageSize: number) => {
        setSkip(pageIndex * pageSize)
        setLimit(pageSize)
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
                fetchData={handleChangePagination}
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
                totalItems={count}
            />
        </PageContainer>
    )
}

export default LocalPost
