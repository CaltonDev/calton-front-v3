import React from 'react'
import Checkbox from '../../../../Checkbox/Checkbox'
import styles from './CustomFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../../../store/filters/filtersSlice'
import Input from '../../../../Input/Input'
import Button from '../../../../Button/Button'

function CustomFilter() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    //const { customFilters, customFiltersSelectable } = useSelector(selectAllFilters)
    const customFilters = [{ name: 'test' }, { name: 'prova' }]
    return (
        <div className={styles.container}>
            {customFilters?.map((filter) => {
                return (
                    <Button key={filter?.name} size={'small'} fullWidth={true}>
                        {filter?.name}
                    </Button>
                )
            })}
        </div>
    )
}

export default CustomFilter
