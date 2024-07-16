import React, { useEffect, useState } from 'react'
import styles from './Sidebar.module.scss'
import CaltonSelect from '../Select/Select'
import { useTranslation } from 'react-i18next'
import SidebarMenu from './SidebarMenu/SidebarMenu'
function Sidebar() {
    const [platformType, setPlatformType] = useState('reviews')
    const { t } = useTranslation()
    const handlePlatformTypeChange = (e: any) => {
        setPlatformType(e?.value)
    }

    const selectOptions = [
        {
            value: 'reviews',
            label: t('Recensioni'),
            className: styles.menuItem,
        },
        {
            value: 'surveys',
            label: t('Sondaggi'),
            className: styles.menuItem,
        },
        {
            value: 'competitor',
            label: t('Competitor'),
            className: styles.menuItem,
        },
        {
            value: 'listing',
            label: t('Listing'),
            className: styles.menuItem,
        },
    ]

    return (
        <div className={styles.sidebarContainer}>
            <CaltonSelect
                options={selectOptions}
                value={
                    selectOptions[
                        selectOptions?.findIndex(
                            (x) => x.value === platformType
                        )
                    ]
                }
                size={'small'}
                fontSize={'medium'}
                customColor={'#7161EF'}
                onChange={handlePlatformTypeChange}
            />
            <div className={styles.divider} />
            <SidebarMenu />
        </div>
    )
}

export default Sidebar
