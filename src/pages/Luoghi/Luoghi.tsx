import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Table from '../../components/Table/Table'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { useTranslation } from 'react-i18next'
function Luoghi() {
    const { t } = useTranslation()
    return (
        <PageContainer>
            <PageHeader heading={t('Luoghi')} subheading={true}></PageHeader>
            <Table />
        </PageContainer>
    )
}

export default Luoghi
