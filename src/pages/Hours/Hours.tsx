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

function Hours() {
    const { t } = useTranslation()
    const [skip, setSkip] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const allFilters = useSelector(selectAllFilters)
    const count = ListingService.getCountOfListings()?.data?.count
    const hoursData = ListingService.getHours({
        listingsName: allFilters?.selectedLocationListing,
        skip,
        limit,
        returnAnt: true,
        code: getNoCodeFromPlatfrom(),
        isSingle: true,
        nextPageToken: null,
    })?.data
    const formatHours = (dayData: any) => {
        if (!dayData || dayData.length === 0) return ''
        const { openHours, openMinutes, closeHours, closeMinutes } = dayData[0]
        return `${openHours}:${openMinutes ? openMinutes : '00'} - ${closeHours}:${closeMinutes ? closeMinutes : '00'}`
    }
    const daysOfWeek = [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
    ]
    const hoursDataFormated = hoursData?.data.map((item: any) => {
        const formatedItem: any = { ...item }
        daysOfWeek.forEach((day) => {
            formatedItem[day] = formatHours(item[day])
        })
        return formatedItem
    })

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
            <PageHeader heading={t('Orario')} subheading={true}></PageHeader>
            <Table
                data={hoursDataFormated}
                columnsData={hoursData?.columns}
                fullyLoaded={false}
                pagination={pagination}
                setPagination={setPagination}
                fetchData={handleChangePagination}
                totalItems={count}
            />
        </PageContainer>
    )
}

export default Hours
