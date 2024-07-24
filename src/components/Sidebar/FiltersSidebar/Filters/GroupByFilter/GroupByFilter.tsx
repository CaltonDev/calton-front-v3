import React from 'react'
import Checkbox from '../../../../Checkbox/Checkbox'
import styles from './GroupByFilter.module.scss'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    setGroupBy,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'

function GroupByFilter() {
    const { groupby } = useSelector(selectAllFilters)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const handleChange = (value: any, type: string) => {
        dispatch(setGroupBy(value))
        const payload = {
            type,
            value: value,
        }
        dispatch(setStateSelect(payload))
    }

    return (
        <div className={styles.container}>
            <Checkbox
                type={'radio'}
                value={'1d'}
                title={t('1 giorno')}
                onClick={() => handleChange('1d', 'groupby')}
                checked={groupby === '1d'}
            />
            <Checkbox
                type={'radio'}
                value={'w'}
                title={t('7 giorni')}
                onClick={() => handleChange('w', 'groupby')}
                checked={groupby === 'w'}
            />
            <Checkbox
                type={'radio'}
                value={'M'}
                title={t('1 mese')}
                onClick={() => handleChange('M', 'groupby')}
                checked={groupby === 'M'}
            />
            <Checkbox
                type={'radio'}
                value={'Q'}
                title={t('3 mesi')}
                onClick={() => handleChange('Q', 'groupby')}
                checked={groupby === 'Q'}
            />
            <Checkbox
                type={'radio'}
                value={'2Q'}
                title={t('6 mesi')}
                onClick={() => handleChange('2Q', 'groupby')}
                checked={groupby === '2Q'}
            />
            <Checkbox
                type={'radio'}
                value={'Y'}
                title={t('1 anno')}
                onClick={() => handleChange('Y', 'groupby')}
                checked={groupby === 'Y'}
            />
        </div>
    )
}

export default GroupByFilter
