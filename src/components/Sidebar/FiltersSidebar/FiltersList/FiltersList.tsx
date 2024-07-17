import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FiltersList.module.scss'
import Typography from '../../../Typography/Typography'
import Switch from '../../../Switch/Switch'
import SvgWrapper from '../../../SvgWrapper/SvgWrapper'
function FiltersList() {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)
    const filtersObj = [
        {
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            svg: 'Fonti.svg',
            label: t('Fonti'),
        },
        {
            svg: 'channels.svg',
            label: t('Canali'),
        },
        {
            svg: 'tempo.svg',
            label: t('Tempo'),
        },
        {
            svg: 'location.svg',
            label: t('Luogo'),
        },
        {
            svg: 'topic.svg',
            label: t('Topic'),
        },
        {
            svg: 'products.svg',
            label: t('Prodotti'),
        },
        {
            svg: 'others.svg',
            label: t('Altri'),
        },
        {
            svg: 'customFilters.svg',
            label: t('I tuoi filtri'),
        },
    ]
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
                    <div key={filter?.svg} className={styles.iconContainer}>
                        <SvgWrapper
                            keySvg={filter?.svg}
                            size={'large'}
                            color={'primaryIcon'}
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
