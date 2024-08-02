import React, { useEffect } from 'react'
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
import { CustomFilterProps } from './CustomFilter.interface'
import { RootState } from '../../../../../store/store'

function CustomFilter({
    openCustomFilter,
    setSelectedCustomFilter,
}: CustomFilterProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customFilters, customFiltersSelectable } =
        useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    const handleCustomFilterSelection = (filter: any) => {
        openCustomFilter(filter?._id)
        setSelectedCustomFilter(filter?.name)
    }
    return (
        <div className={styles.container}>
            {customFiltersSelectable?.map((filter: any) => {
                return (
                    <Button
                        key={filter?.name}
                        size={'small'}
                        fullWidth={true}
                        onClick={() => handleCustomFilterSelection(filter)}
                        color={
                            platformType === 'reviews'
                                ? 'reviews'
                                : platformType === 'surveys'
                                  ? 'surveys'
                                  : platformType === 'competitor'
                                    ? 'competitor'
                                    : 'listing'
                        }
                    >
                        {filter?.name}
                    </Button>
                )
            })}
        </div>
    )
}

export default CustomFilter
