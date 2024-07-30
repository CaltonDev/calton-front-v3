import styles from './FiltersSummaryContainer.module.scss'
import FiltersButton from './FiltersButton/FiltersButton'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { resetFilters } from '../../../store/filters/filtersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { displayVariations } from '../../../helpers/helpers'
import { SettingsState } from '../../../store/settings/settingsSlice'
import { FilterType } from '../../../utils/filterHelpers'
import { FilterSummaryContainerProps } from './FilterSummaryContainer.interface'

function FiltersSummaryContainer(filters: FilterSummaryContainerProps) {
    const [filter, setFilter] = useState(filters?.filter)
    const [upperFilters, setUpperFilters] = useState([])
    const [more, setMore] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const platformType = useSelector(
        (state: SettingsState) => state.Settings.platformType
    )

    useEffect(() => {
        setFilter(filters?.filter)
    }, [filters])
    const getActiveFilters = () => {
        if (!filter || !Array.isArray(filter)) {
            return []
        }

        return filter.filter(
            (elm: FilterType) =>
                JSON.stringify(elm.condition) !== JSON.stringify(elm.value) &&
                elm.value != null
        )
    }

    const listingStates = [
        {
            label: t('Verificato'),
            value: 'verified',
        },
        {
            label: t('Non verificato'),
            value: 'toVerify',
        },
        {
            label: t('Verifica in corso'),
            value: 'pendingVerification',
        },
        {
            label: t('Duplicati'),
            value: 'isDuplicated',
        },
        {
            label: t('Codice negozio mancante'),
            value: 'missedStoreCode',
        },
    ]

    useEffect(() => {
        if (getActiveFilters().length > 4) {
            const tmpFilters = JSON.parse(JSON.stringify(filter)).slice(0, 5)
            setUpperFilters(tmpFilters)
            setMore(true)
        } else {
            setUpperFilters(JSON.parse(JSON.stringify(filter)))
            setMore(false)
        }
    }, [filter])

    const prepareValue = () => {
        const tmpArray: any[] = []
        const arrayFilters: any[] = []
        JSON.parse(JSON.stringify(filter))
            .slice(5, filter?.length)
            .map((elm: any) => {
                if (
                    JSON.stringify(elm.condition) !==
                        JSON.stringify(elm.value) &&
                    elm.value != null
                ) {
                    tmpArray.push(elm.text)
                    arrayFilters.push(elm.text)
                    tmpArray.push(<br />)
                    let value
                    if (Array.isArray(elm.condition)) {
                        if (elm.mapValue) {
                            value = elm?.value
                                ?.map((el: any) => el[elm.mapValue])
                                ?.join(', ')
                        } else if (elm?.value) {
                            value = elm?.value?.join(', ')
                        } else {
                            value = null
                        }
                        tmpArray.push(value)
                        tmpArray.push(<br />)
                    }
                }
            })

        return { tmpArray, arrayFilters }
    }

    /*const checkPageFilter = (filter: FilterType) => {
        //First one allows the time filter to be displayed only in listing ->performance
        //Second one removes all other filters except from source inside listing->menu
        return (
            !(
                filter?.filter === 3 &&
                platformType === 'listing' &&
                !window.location.pathname.includes('performance')
            ) &&
            !(
                filter?.filter !== 4 &&
                platformType === 'listing' &&
                !window.location.pathname.includes('performance')
            )
        )
    }*/

    useEffect(() => {
        console.log('upperFilters: ', upperFilters)
    }, [upperFilters])

    return (
        <>
            {upperFilters.map((elm: any) => {
                const display = elm.valueText
                let value
                if (Array.isArray(elm.condition)) {
                    if (elm.key === 'selectedProducts') {
                        value = elm?.value
                            ?.map((el: any) => {
                                if (el.idProductParent === null) {
                                    return el[elm.mapValue]
                                } else {
                                    return displayVariations(el)
                                }
                            })
                            ?.join(', ')
                    } else if (elm.mapValue) {
                        const tmpArr = elm?.value?.map(
                            (el: any) => el[elm.mapValue]
                        )
                        if (elm.filter === 7) {
                            const tmpDisplay: any[] = []
                            elm?.value?.forEach((element: any, i: number) => {
                                const tmpString =
                                    element['attribute'] +
                                    ': ' +
                                    elm.value[i][elm.mapValue]
                                tmpDisplay.push(tmpString)
                            })
                            value = tmpDisplay?.join(', ')
                        } else if (
                            elm.filter === 4 &&
                            platformType === 'listing'
                        ) {
                            const tmpDisplay: any[] = []
                            elm?.value?.forEach((element: any) => {
                                tmpDisplay.push(element?.title)
                            })
                            value = tmpDisplay?.join(', ')
                        } else if (elm.filter === 8) {
                            const tmpDisplay: any[] = []
                            elm?.value?.forEach((element: any, i: number) => {
                                const tmpString =
                                    element['attribute'] +
                                    ': ' +
                                    elm.value[i][elm.mapValue]
                                tmpDisplay.push(tmpString)
                            })
                            value = tmpDisplay?.join(', ')
                        } else {
                            value = tmpArr?.join(', ')
                        }
                    } else if (elm?.value) {
                        value = elm?.value?.join(', ')
                    } else {
                        value = null
                    }
                }
                // Filtri custom su Test: [1,2], su Pippo: [2,3]
                if (
                    JSON.stringify(elm.condition) !==
                        JSON.stringify(elm.value) &&
                    elm.value != null &&
                    elm?.filter !== 8 //&&
                    //checkPageFilter(elm.filter)
                ) {
                    return (
                        <FiltersButton
                            showCancel={elm.showCancel}
                            valueExp={value}
                            key={elm.key}
                            title={value ? display + value : elm.text + display}
                            keyUpdate={elm.key}
                            isMore={false}
                            filter={elm.filter}
                        />
                    )
                }

                if (
                    JSON.stringify(elm.condition) !==
                        JSON.stringify(elm.value) &&
                    elm?.filter === 8 &&
                    elm.value != null
                ) {
                    const displayableValue: any[] = []
                    Object.keys(elm.value).forEach((key) => {
                        if (
                            elm.value[key]?.yes !== null ||
                            elm.value[key]?.no !== null
                        ) {
                            const displayableLabel: any[] = []

                            if (elm.value[key]?.yes) {
                                displayableLabel.push(t('Si'))
                            }

                            if (elm.value[key]?.no) {
                                displayableLabel.push(t('No'))
                            }
                            displayableValue.push(
                                listingStates.find((obj) => obj?.value === key)
                                    ?.label +
                                    ': ' +
                                    displayableLabel?.join(', ')
                            )
                        }
                    })

                    return (
                        <FiltersButton
                            showCancel={elm.showCancel}
                            valueExp={displayableValue?.join(', ')}
                            title={displayableValue?.join(', ')}
                            keyUpdate={elm.key}
                            key={elm.key}
                            isMore={false}
                            filter={elm.filter}
                        />
                    )
                }
            })}
            {more && (
                <FiltersButton
                    valueExp={prepareValue().tmpArray}
                    title={
                        '+ ' +
                        prepareValue().arrayFilters.length +
                        ' ' +
                        t('Filtri')
                    }
                    isMore={true}
                />
            )}
            {more && (
                <span
                    onClick={() => dispatch(resetFilters())}
                    className={styles.resetAll}
                >
                    {t('rimuovi filtri')}
                </span>
            )}
        </>
    )
}

export default FiltersSummaryContainer
