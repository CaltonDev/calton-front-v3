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
import any = jasmine.any
import { CustomFilterSingleProps } from './CustomFilter.interface'

function CustomFilterSingle({ customFilterId }: CustomFilterSingleProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const example: any[] = []

    const { customFilters, customFiltersSelectable } =
        useSelector(selectAllFilters)

    const equalsIgnoreOrder = (a: string[], b: string[]) => {
        if (a?.length !== b?.length) return false
        //check
        const uniqueValues = new Set([...a, ...b])
        //changed compilerOptions from es5 to es6 to handle typescript error on Set iteration
        for (const v of uniqueValues) {
            const aCount = a.filter((e: string) => e === v).length
            const bCount = b.filter((e: string) => e === v).length
            if (aCount !== bCount) return false
        }
        return true
    }

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
        dispatch(setCustomFilter(filters))
    }

    const filterCustom = customFiltersSelectable.filter(
        (elm: any) => elm._id === customFilterId
    )
    const defaultValue = customFilters.filter(
        (elm: any) => elm._id === filterCustom._id
    )[0]?.selectedCustom

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                key={filterCustom._id}
                label={'Seleziona filtri'}
                placeholderInput={t('Cerca')}
                labels={filterCustom.values}
                multiple={filterCustom.multiple}
                type={'locations'}
                handleChange={(e) => handleChangeCustomFilter(e, filterCustom)}
                defaultValue={defaultValue}
            />
        </div>
    )
}

export default CustomFilterSingle
