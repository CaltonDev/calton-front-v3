import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Filter.module.scss'
import Typography from '../../../Typography/Typography'
import Switch from '../../../Switch/Switch'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
import Button from '../../../Button/Button'
import { FilterProps } from './Filter.interface'

function Filter({ filter }: FilterProps) {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

    const filtersObj = [
        {
            key: 'raggruppa',
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            key: 'fonti',
            svg: 'Fonti.svg',
            label: t('Fonti'),
        },
        {
            key: 'channels',
            svg: 'channels.svg',
            label: t('Canali'),
        },
        {
            key: 'tempo',
            svg: 'tempo.svg',
            label: t('Tempo'),
        },
        {
            key: 'location',
            svg: 'location.svg',
            label: t('Luogo'),
        },
        {
            key: 'topic',
            svg: 'topic.svg',
            label: t('Topic'),
        },
        {
            key: 'products',
            svg: 'products.svg',
            label: t('Prodotti'),
        },
        {
            key: 'others',
            svg: 'others.svg',
            label: t('Altri'),
        },
        {
            key: 'customFilters',
            svg: 'customFilters.svg',
            label: t('I tuoi filtri'),
        },
    ]

    const handleFiltersClick = (filterId: string) => {
        setSelectedFilter(filterId)
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <div className={styles.header}>
                    <SvgWrapper
                        keySvg={filter?.svg}
                        size={'large'}
                        color={'white'}
                    />
                    <Typography size={'h6'} weight={'bold'} color={'white'}>
                        {filter?.label}
                    </Typography>
                </div>
            </div>

            <div className={styles.footerContainer}>
                <Button size={'medium'} disabled={true}>
                    {t('Applica')}
                </Button>
            </div>
        </div>
    )
}

export default Filter
