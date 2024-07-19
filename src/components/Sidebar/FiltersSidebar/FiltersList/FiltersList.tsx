import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FiltersList.module.scss'
import Typography from '../../../Typography/Typography'
import Switch from '../../../Switch/Switch'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
import { FilterInterface } from '../Filters.interface'
function FiltersList({ setSelectedFilter }: any) {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)

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

    const handleFiltersClick = (filter: FilterInterface) => {
        setSelectedFilter(filter)
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Typography
                    size={'bodySmall'}
                    weight={'bold'}
                    color={'reviews'}
                >
                    {t('Filtri')?.toUpperCase()}
                </Typography>
            </div>
            {filtersObj?.map((filter) => {
                return (
                    <div key={filter?.key} className={styles.iconContainer}>
                        <SvgWrapper
                            keySvg={filter?.svg}
                            size={'large'}
                            color={'primaryIcon'}
                            onClick={() => handleFiltersClick(filter)}
                        />
                        <Typography
                            size={'bodyXSmall'}
                            weight={'normal'}
                            color={'tertiary'}
                        >
                            {filter?.label}
                        </Typography>
                    </div>
                )
            })}
            <div className={styles.titleContainer}>
                <Switch
                    checked={checked}
                    disabled={false}
                    onClick={() => setChecked(!checked)}
                    icon={true}
                />
            </div>
        </div>
    )
}

export default FiltersList
