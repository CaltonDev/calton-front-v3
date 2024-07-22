import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FilterBtn.module.scss'
import { FilterBtnProps } from './FilterBtn.interface'
function FilterBtn({ onClick }: FilterBtnProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.container} onClick={onClick}>
            <span className={styles.text}>{t('Filtri')?.toUpperCase()}</span>
        </div>
    )
}

export default FilterBtn
