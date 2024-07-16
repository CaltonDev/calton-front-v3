import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './FilterBtn.module.scss'
function FilterBtn() {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <span className={styles.text}>{t('Filtri')?.toUpperCase()}</span>
        </div>
    )
}

export default FilterBtn
