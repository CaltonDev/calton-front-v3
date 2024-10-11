import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import ListingService from '../../services/ListingService'
import { PaginationState } from '@tanstack/react-table'
import { useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'

function Menus() {
    const { t } = useTranslation()
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const allFilters = useSelector(selectAllFilters)
    const count = ListingService.getCountOfListings()?.data?.count
    const menusData = ListingService.getMenus(
        getNoCodeFromPlatfrom(),
        allFilters?.selectedLocationListing,
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        false,
        false,
        count,
        true
    )?.data

    return (
        <PageContainer>
            <PageHeader heading={t('Menu')} subheading={true}></PageHeader>
            <Table
                data={menusData?.data}
                columnsData={menusData?.columns}
                fullyLoaded={false}
                pagination={pagination}
                setPagination={setPagination}
                totalItems={count}
            />
        </PageContainer>
    )
}

export default Menus
