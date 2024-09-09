import React from 'react'
import styles from './PlacesFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import { CustomAutocompleteFilter } from '../../Filter/Filter.interface'
import store, { RootState } from '../../../../../store/store'
import FilterService from '../../../../../services/FilterService'
import { getNoCodeFromPlatfrom } from '../../../../../helpers/helpers'

function PlacesFilter({ setPreparedPayload }: CustomAutocompleteFilter) {
    const { selectedLocation, selectedLocationDetails } =
        useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const allLocations =
        FilterService.getLocationsFiltered(
            platformType === 'surveys'
                ? [0, 1, 2, 3, 4]
                : getNoCodeFromPlatfrom(),
            false
        )?.data?.data || []

    const { t } = useTranslation()

    const equalsIgnoreOrder = (a: string[], b: string[]) => {
        if (a?.length !== b?.length) return false
        const uniqueValues = new Set([...a, ...b])
        for (const v of uniqueValues) {
            const aCount = a.filter((e) => e === v).length
            const bCount = b.filter((e) => e === v).length
            if (aCount !== bCount) return false
        }
        return true
    }

    const handleChange = (event: any, type: string) => {
        const allids = event.map((e: any) => {
            if (e && e._id) return e._id
            else if (e && !e._id) return e
        })
        const allPlacesSelected: any[] = []
        allLocations.forEach((item: any) => {
            allids.forEach((elm: any) => {
                if (item._id == elm) allPlacesSelected.push(item)
            })
        })

        if (!equalsIgnoreOrder(allids, selectedLocation)) {
            const payload = {
                type,
                value: allids,
                optional: allPlacesSelected,
            }
            setPreparedPayload(payload)
        }
    }

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                label={
                    selectedLocationDetails &&
                    selectedLocationDetails.length === 0
                        ? t('Tutti i luoghi')
                        : selectedLocationDetails?.length + t('luoghi')
                }
                placeholderInput={t('Cerca luoghi')}
                primary={platformType === 'listing' ? 'title' : 'locationName'}
                secondary={'formatted_address'}
                labels={allLocations}
                type={'locations'}
                handleChange={handleChange}
                defaultValue={selectedLocation}
                multiple={true}
                hasDropdown={true}
            />
        </div>
    )
}

export default PlacesFilter
