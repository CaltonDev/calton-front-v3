import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '../../components/Typography/Typography'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'

function EditHours() {
    const { t } = useTranslation()

    const data = [
        {
            title: 'Nome del report',
            value: ['report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number', 'report number', 'report number'],
        },
        {
            title: 'Nome del report',
            value: ['report number'],
        },
    ]
    return (
        <>
            <div>Hello World</div>
            <PageContainer>
                <PageHeader heading={t('Edit Hours')}></PageHeader>
                <CardSelection data={data} title={t('Edit Hours')} />
            </PageContainer>
        </>
    )
}

export default EditHours
