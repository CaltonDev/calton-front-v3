import React from 'react'
import styles from './TopicsFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    setCustomFilter,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'
import { CustomAutocompleteFilter } from '../../Filter/Filter.interface'
import { RootState } from '../../../../../store/store'
import FilterService from '../../../../../services/FilterService'

function TopicsFilter({ setPreparedPayload }: CustomAutocompleteFilter) {
    const dispatch = useDispatch()
    const { selectedTopics, customFilters } = useSelector(selectAllFilters)
    /*const allTopics =
        useSelector(
            (state: RootState) => state.SelectableFilters.data?.allTopics
        ) || [] //TODO: check filters, probably we should move this to react query and not set them undefined but []*/
    const { t } = useTranslation()

    const allTopics = FilterService.getTopicFiltered(true)?.data?.data || []
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

    const saveFiltersToRedux = (data: any, type: string) => {
        const payload = {
            _id: null,
            collection: 'feedback',
            EP_config: null,
            attribute: type,
            selectedCustom: [data],
        }
        const foundFilters = customFilters?.filter(
            (elm: any) => elm.attribute === type
        )
        if (!foundFilters || foundFilters.length == 0) {
            const tmpfeedbackFilters = JSON.parse(JSON.stringify(customFilters))
            tmpfeedbackFilters?.push(payload)
            dispatch(setCustomFilter(tmpfeedbackFilters))
        } else {
            const filtersToSave: any[] = []
            customFilters?.map((elm: any) => {
                if (
                    elm.attribute === type &&
                    !elm.selectedCustom.includes(data)
                ) {
                    const tmpArr = JSON.parse(JSON.stringify(elm))
                    const tmp = tmpArr.selectedCustom
                    tmp.push(data)
                    tmpArr.selectedCustom = tmp
                    if (tmpArr && tmpArr?.selectedCustom.length > 0)
                        filtersToSave.push(tmpArr)
                } else if (
                    elm.attribute === type &&
                    elm.selectedCustom.includes(data)
                ) {
                    const tmpArr = JSON.parse(JSON.stringify(elm))
                    const tmp = tmpArr.selectedCustom.filter(
                        (el: any) => el != data
                    )
                    tmpArr.selectedCustom = tmp
                    if (tmpArr && tmpArr?.selectedCustom.length > 0)
                        filtersToSave.push(tmpArr)
                } else {
                    filtersToSave.push(elm)
                }
            })
            //todo: check if necessary
            dispatch(setCustomFilter(filtersToSave))
        }
    }

    const handleChange = (event: any, type: string) => {
        const allids = event.map((e: any) => {
            if (e && e._id) return e._id
            else if (e && e?.name === 'Non Analizzati') {
                return null
            } else if (e === null) {
                return null
            } else if (e && !e._id) {
                return e
            }
        })
        const allTopicsSelected: any = []
        allTopics.forEach((item: any) => {
            allids.forEach((elm: any) => {
                if (item._id == elm) allTopicsSelected.push(item)
            })
        })
        if (!equalsIgnoreOrder(allids, selectedTopics)) {
            const payload = {
                type,
                value: allids,
                optional: allTopicsSelected,
            }
            setPreparedPayload(payload)
            const foundFilters = customFilters?.filter(
                (elm: any) => elm.attribute === 'testo'
            )
            if (allids?.length > 0) {
                if (foundFilters?.length === 0)
                    saveFiltersToRedux('Con testo', 'testo')
            } else {
                if (foundFilters?.length > 0)
                    saveFiltersToRedux('Con testo', 'testo')
            }
        }
    }

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                label={
                    selectedTopics && selectedTopics?.length == 0
                        ? t('Tutti i topic')
                        : selectedTopics?.length + t('topic')
                }
                placeholderInput={t('Cerca topic')}
                primary={'name'}
                secondary={'words'}
                labels={allTopics}
                type={'topics'}
                handleChange={handleChange}
                defaultValue={selectedTopics}
                multiple={true}
                hasDropdown={true}
            />
        </div>
    )
}

export default TopicsFilter
