import React from 'react'
import styles from './SourcesFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import { setStateSelect } from '../../../../../store/filters/filtersSlice'
import { CustomAutocompleteFilter } from '../../Filter/Filter.interface'
import { RootState } from '../../../../../store/store'
import SourcesService from '../../../../../services/SourcesService'
import { getNoCodeFromPlatfrom } from '../../../../../helpers/helpers'

function SourcesFilter({ setPreparedPayload }: CustomAutocompleteFilter) {
    const { t } = useTranslation()

    const { selectedSource, sourceName } = useSelector(selectAllFilters)

    const allFonti =
        SourcesService.getSourcesFiltered(getNoCodeFromPlatfrom())?.data
            ?.data || []
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

    const handleChange = (event: any, type: string) => {
        let newEvent = event
        const allids: string[] = []
        const result: any[] = []
        const allSourcesSelected: any[] = []

        if (
            sourceName?.length > 0 &&
            sourceName?.length !== newEvent?.length &&
            newEvent.length > 0
        ) {
            const map: any = {}
            newEvent.forEach((obj: any) => {
                if (obj._id) {
                    map[obj._id] = obj
                } else {
                    map[obj] = obj
                }
            })

            sourceName.forEach((obj: any) => {
                const obj2 = map[obj._id]
                if (!obj2) {
                    result.push(obj)
                }
            })

            result.forEach((res) => {
                if (res?.idProductParent === null && res?.idProduct !== null) {
                    newEvent = newEvent.filter((elm: any) => {
                        const child: any = allFonti.find(
                            (x: any) => x._id === elm
                        )
                        return !(child?.idProductParent === res?.idProduct)
                    })
                }
            })
        }
        if (!equalsIgnoreOrder(event, selectedSource)) {
            newEvent.map((e: any) => {
                if (
                    typeof e === 'object' &&
                    'idProductParent' in e &&
                    e?.idProductParent === null &&
                    e.idProduct !== null
                ) {
                    allFonti.forEach((prod: any) => {
                        if (
                            prod?.idProductParent === e?.idProduct &&
                            !allids.includes(prod?._id)
                        ) {
                            allids.push(prod._id)
                        }
                    })
                }
                if (e && e._id && !allids.includes(e._id)) allids.push(e._id)
                else if (e && !e._id) allids.push(e)
            })
            allFonti.forEach((item: any, i: number) => {
                allids.forEach((elm, i) => {
                    if (item._id == elm) {
                        allSourcesSelected.push(item)
                    }
                })
            })

            //infer from type but we should standardize payload
            const payload: {
                type: string
                value: any
                optional: any
            } = {
                type,
                value: allids,
                optional: allSourcesSelected,
            }
            setPreparedPayload(payload)
        }
    }

    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                label={
                    selectedSource && selectedSource?.length == 0
                        ? 'Tutti le fonti'
                        : selectedSource?.length + ' fonti'
                }
                placeholderInput={'Cerca fonti'}
                primary={'name'}
                secondary={'formatted_address'}
                labels={allFonti ? allFonti : []}
                type={'source'}
                multiple={false}
                handleChange={handleChange}
                defaultValue={selectedSource}
                hasDropdown={true}
            />
        </div>
    )
}

export default SourcesFilter
