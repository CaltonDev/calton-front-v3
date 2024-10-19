import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import ListingService from '../../services/ListingService'
import { PaginationState } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'

function Photos() {
    const { t } = useTranslation()
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const allFilters = useSelector(selectAllFilters)
    const count = ListingService.getCountOfListings()?.data?.count

    const photosData = ListingService.getPhotos(
        allFilters?.selectedLocationListing,
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        true,
        false,
        null,
        null,
        count,
        true
    )?.data

    return (
        <PageContainer>
            <PageHeader heading={t('Photos')} subheading={true}></PageHeader>
            <Table
                data={photosData?.data}
                columnsData={photosData?.columns}
                fullyLoaded={false}
                pagination={pagination}
                setPagination={setPagination}
                totalItems={count}
            />
        </PageContainer>
    )
}

export default Photos
