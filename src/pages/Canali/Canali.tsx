import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import FilterService from '../../services/FilterService'
import { PaginationState } from '@tanstack/react-table'

function Canali() {
    const { t } = useTranslation()
    const channelsData = FilterService.getChannelSourcesFiltered()?.data
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader heading={t('Canali')} subheading={true}></PageHeader>
            <Table
                data={channelsData?.data}
                columnsData={channelsData?.columns}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default Canali
