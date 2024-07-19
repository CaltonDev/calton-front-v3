import React, { useEffect } from 'react'
import Checkbox from '../../../../Checkbox/Checkbox'
import styles from './GroupByFilter.module.scss'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    setGroupBy,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'
import {
    SelectableFiltersState,
    setAllSources,
} from '../../../../../store/filters/selectableFiltersSlice'

function GroupByFilter() {
    const { groupby } = useSelector(selectAllFilters)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const handleChange = (event: any, type: string) => {
        dispatch(setGroupBy(event.target.value))
        const payload = {
            type,
            value: event.target.value,
        }
        dispatch(setStateSelect(payload))
    }

    return (
        <div className={styles.container}>
            <Checkbox type={'radio'} value={'1d'} title={t('1 giorno')} />
            <Checkbox type={'radio'} value={'w'} title={t('7 giorni')} />
            <Checkbox type={'radio'} value={'M'} title={t('1 mese')} />
            <Checkbox type={'radio'} value={'Q'} title={t('3 mesi')} />
            <Checkbox type={'radio'} value={'2Q'} title={t('6 mesi')} />
            <Checkbox type={'radio'} value={'Y'} title={t('1 anno')} />
        </div>
    )
}

export default GroupByFilter
