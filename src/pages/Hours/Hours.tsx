import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import ListingService from '../../services/ListingService'
import { PaginationState } from '@tanstack/react-table'

function Hours() {
    const { t } = useTranslation()
    const hoursData = ListingService.getHoursData()?.data
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
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader heading={t('Orario')} subheading={true}></PageHeader>
            <Table
                data={hoursDataFormated}
                columnsData={hoursData?.columns}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default Hours
