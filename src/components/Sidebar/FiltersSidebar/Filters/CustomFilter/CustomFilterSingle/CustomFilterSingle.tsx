import React, { useEffect } from 'react'
import styles from './CustomFilterSingle.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../../store/selectors/selectorsSlice'
import {
    setCustomFilter,
    setCustomFilterSelectable,
    setStateSelect,
} from '../../../../../../store/filters/filtersSlice'
import { CustomFilterSingleProps } from './CustomFilter.interface'

function CustomFilterSingle({
    customFilterId,
    setPreparedPayload,
}: CustomFilterSingleProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customFilters, customFiltersSelectable } =
        useSelector(selectAllFilters)
    const filterCustom = customFiltersSelectable.filter(
        (elm: any) => elm._id === customFilterId
    )[0]

    console.log('filterCustom?.values: ', filterCustom)
    const handleChangeCustomFilter = (event: any, filterCustom: any) => {
        const customFilter = {
            _id: filterCustom._id,
            collection: filterCustom.collection,
            EP_config: filterCustom.EP_config,
            attribute: filterCustom.attribute,
            selectedCustom:
                typeof event === 'object' && !Array.isArray(event)
                    ? [event.target.value]
                    : event,
        }

        const filters = customFilters.filter(
            (elm: any) => elm._id !== customFilter._id
        )
        if (customFilter.selectedCustom.length > 0) {
            filters.push(customFilter)
        }
        //            setPreparedPayload(payload)
        dispatch(setCustomFilter(filters))
    }

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                key={filterCustom._id}
                label={'Seleziona filtri'}
                placeholderInput={t('Cerca')}
                labels={filterCustom?.values}
                multiple={filterCustom.multiple}
                type={'locations'}
                handleChange={(e) => handleChangeCustomFilter(e, filterCustom)}
                //defaultValue={filterCustom}
            />
        </div>
    )
}

export default CustomFilterSingle
