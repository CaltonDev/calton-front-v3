import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FilterBtn.module.scss'
import { FilterBtnProps } from './FilterBtn.interface'
import { getBackgroundColor } from '../../../../utils/utils'
import { useSelector } from 'react-redux'
import { SettingsState } from '../../../../store/settings/settingsSlice'
function FilterBtn({ onClick }: FilterBtnProps) {
    const { t } = useTranslation()
    const platformType = useSelector(
        (state: SettingsState) => state.Settings.platformType
    )

    return (
        <div
            className={styles.container}
            style={{ background: getBackgroundColor(platformType) }}
            onClick={onClick}
        >
            <span className={styles.text}>{t('Filtri')?.toUpperCase()}</span>
        </div>
    )
}

export default FilterBtn
