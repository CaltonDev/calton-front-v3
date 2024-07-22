import React from 'react'
import styles from './ChannelsFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../../../store/filters/filtersSlice'

function ChannelsFilter() {
    const dispatch = useDispatch()
    const allChannelSources = useSelector(
        (state: SelectableFiltersState) =>
            state.SelectableFilters.allChannelSources
    )
    const { selectedChannel } = useSelector(selectAllFilters)
    const { t, i18n } = useTranslation()

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
        if (!equalsIgnoreOrder(event, selectedChannel)) {
            const payload = {
                type,
                value: event,
            }
            dispatch(setStateSelect(payload))
        }
    }

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                label={
                    selectedChannel && selectedChannel?.length === 0
                        ? t('Tutti i canali')
                        : selectedChannel?.length + t('canali')
                }
                placeholderInput={t('Cerca canali')}
                primary={''}
                secondary={''}
                labels={allChannelSources}
                type={'channelSources'}
                handleChange={handleChange}
                defaultValue={selectedChannel}
                multiple={true}
                hasDropdown={true}
            />
        </div>
    )
}

export default ChannelsFilter
