import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FiltersList.module.scss'
import Typography from '../../../Typography/Typography'
import Switch from '../../../Switch/Switch'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
import { FilterInterface } from '../Filters.interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
function FiltersList({
    setSelectedFilter,
    blockSidebar,
    setBlockSidebar,
}: any) {
    const { t } = useTranslation()
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    const filtersObj = [
        {
            key: 'raggruppa',
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            key: 'fonti',
            svg: 'Topic.svg',
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
                    color={
                        platformType === 'reviews'
                            ? 'reviews'
                            : platformType === 'surveys'
                              ? 'surveys'
                              : platformType === 'competitor'
                                ? 'competitor'
                                : platformType === 'settings'
                                  ? 'settings'
                                  : 'listing'
                    }
                >
                    {t('Filtri')?.toUpperCase()}
                </Typography>
            </div>
            {filtersObj?.map((filter) => {
                return (
                    <div key={filter?.key} className={styles.iconContainer}>
                        <SvgWrapper
                            keySvg={filter?.svg}
                            size={'medium'}
                            color={'primaryIcon'}
                            onClick={() => handleFiltersClick(filter)}
                        />
                        <Typography
                            size={'bodyXSmall'}
                            weight={'normal'}
                            color={'grey'}
                        >
                            {filter?.label}
                        </Typography>
                    </div>
                )
            })}
            <div className={styles.titleContainer}>
                <Switch
                    checked={blockSidebar}
                    disabled={false}
                    onClick={() => setBlockSidebar(!blockSidebar)}
                    icon={true}
                />
            </div>
        </div>
    )
}

export default FiltersList
