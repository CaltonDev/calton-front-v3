import React from 'react'
import styles from './TimeFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../../../store/filters/filtersSlice'

function TimeFilter() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const { selectedSource, sourceName } = useSelector(selectAllFilters)
    const allFonti = useSelector(
        (state: SelectableFiltersState) => state.SelectableFilters.allSources
    )

    return <div className={styles.container}></div>
}

export default TimeFilter
