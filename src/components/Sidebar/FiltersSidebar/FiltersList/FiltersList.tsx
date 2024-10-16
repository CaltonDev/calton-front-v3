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
    filters,
}: any) {
    const { t } = useTranslation()
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    const handleFiltersClick = (filter: FilterInterface) => {
        setSelectedFilter(filter)
    }

    return (
        <div className={styles.container}>
            <div>
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
                <div className={styles.filtersContainer}>
                    {filters?.map((filter: any) => {
                        return (
                            <div
                                key={filter?.key}
                                className={styles.iconContainer}
                            >
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
                </div>
            </div>
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
