import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { PaginationState } from '@tanstack/react-table'
import SourcesService from '../../services/SourcesService'

function AddFonti() {
    const { t } = useTranslation()
    const sourcesData = SourcesService.getAllSources(
        getNoCodeFromPlatfrom(),
        true
    )?.data
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader heading={t('AddFonti')} subheading={true}></PageHeader>
            <Table
                data={sourcesData?.data || []}
                columnsData={sourcesData?.columns || []}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default AddFonti
