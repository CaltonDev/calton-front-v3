import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import FilterService from '../../services/FilterService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { PaginationState } from '@tanstack/react-table'

function Luoghi() {
    const { t } = useTranslation()
    const locationData = FilterService.getLocationsFiltered(
        getNoCodeFromPlatfrom(),
        true
    )
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader heading={t('Luoghi')} subheading={true}></PageHeader>
            <Table
                data={locationData?.data?.data}
                columnsData={locationData?.data?.columns}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default Luoghi
