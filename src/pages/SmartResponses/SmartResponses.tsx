import React from 'react'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
import { PaginationState } from '@tanstack/react-table'
import SmartResponseService from '../../services/SmartResponseService'

function SmartResponses() {
    const { t } = useTranslation()
    const smartResponsesData =
        SmartResponseService.getAllSmartResponses(true)?.data
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    return (
        <PageContainer>
            <PageHeader
                heading={t('SmartResponses')}
                subheading={true}
            ></PageHeader>
            <Table
                data={smartResponsesData?.data || []}
                columnsData={smartResponsesData?.columns || []}
                fullyLoaded={true}
                pagination={pagination}
                setPagination={setPagination}
            />
        </PageContainer>
    )
}

export default SmartResponses
