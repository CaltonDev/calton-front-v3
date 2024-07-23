import React from 'react'
import styles from './ProductsFilter.module.scss'
import { useTranslation } from 'react-i18next'
import CustomAutocomplete from '../../../../CustomAutocomplete/CustomAutocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableFiltersState } from '../../../../../store/filters/selectableFiltersSlice'
import { selectAllFilters } from '../../../../../store/selectors/selectorsSlice'
import {
    setCustomFilter,
    setStateSelect,
} from '../../../../../store/filters/filtersSlice'

function ProductsFilter() {
    const allProducts = useSelector(
        (state: SelectableFiltersState) => state.SelectableFilters.allProducts
    )
    const { selectedProductsDetails, selectedProducts } =
        useSelector(selectAllFilters)
    const dispatch = useDispatch()

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
        const allids: any[] = []
        const allProductsSelected: string[] = []
        const result: any[] = []
        let newEvent = event

        if (
            selectedProductsDetails?.length > 0 &&
            selectedProductsDetails?.length !== newEvent?.length &&
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

            selectedProductsDetails.forEach((obj: any) => {
                const obj2 = map[obj._id]
                if (!obj2) {
                    result.push(obj)
                }
            })

            result.forEach((res) => {
                if (res?.idProductParent === null && res?.idProduct !== null) {
                    newEvent = newEvent.filter((elm: any) => {
                        const child: any = allProducts.find(
                            (x: any) => x._id === elm
                        )
                        return !(child?.idProductParent === res?._id)
                    })
                }
            })
        }
        newEvent.map((e: any) => {
            if (e?.idProductParent === null) {
                allProducts?.forEach((prod: any) => {
                    if (
                        prod?.idProductParent === e?._id &&
                        !allids.includes(prod?._id)
                    ) {
                        allids.push(prod._id)
                    }
                })
            }
            if (e && e._id && !allids.includes(e._id)) allids.push(e._id)
            else if (e && !e._id) allids.push(e)
        })
        allProducts?.forEach((item: any) => {
            allids.forEach((elm) => {
                if (item._id == elm) {
                    allProductsSelected.push(item)
                }
            })
        })
        if (!equalsIgnoreOrder(allids, selectedProducts)) {
            const payload = {
                type,
                value: allids,
                optional: allProductsSelected,
            }
            dispatch(setStateSelect(payload))
        }
    }
    return (
        <div className={styles.container}>
            <CustomAutocomplete
                displayType={'filter'}
                label={
                    selectedProducts && selectedProducts?.length == 0
                        ? 'Tutti i prodotti'
                        : selectedProducts?.length + ' prodotti'
                }
                placeholderInput={'Cerca prodotti'}
                primary={'productName'}
                secondary={'asin'}
                labels={allProducts ? allProducts : []}
                type={'selectedProducts'}
                handleChange={handleChange}
                defaultValue={selectedProducts}
                multiple={true}
                hasDropdown={true}
            />
        </div>
    )
}

export default ProductsFilter
