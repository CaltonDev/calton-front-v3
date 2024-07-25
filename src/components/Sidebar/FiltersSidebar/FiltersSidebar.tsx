import React, { RefObject, useEffect, useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'
import Filter from './Filter/Filter'
import { useTranslation } from 'react-i18next'
import { FilterInterface } from './Filters.interface'
import Hooks from '../../../utils/hooks/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import CustomFilterService from '../../../services/CustomFilterService'
import { setCustomFilterSelectable } from '../../../store/filters/filtersSlice'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { SettingsState } from '../../../store/settings/settingsSlice'

function FiltersSidebar() {
    const [showFilterList, setShowFilterList] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const { t } = useTranslation()
    const [selectedFilter, setSelectedFilter] = useState<FilterInterface>({
        key: '',
        label: '',
        svg: '',
    })
    const dispatch = useDispatch()
    const platformType = useSelector(
        (state: SettingsState) => state.Settings.platformType
    )

    const { customFilters, customFiltersSelectable } =
        useSelector(selectAllFilters)
    const commonFilters = [
        {
            nameButton: t('Raggruppa'),
            idx: 0,
        },
        {
            nameButton: t('Fonte'),
            idx: 1,
        },
        {
            nameButton: t('Canale'),
            idx: 2,
        },
        {
            nameButton: t('Tempo'),
            idx: 3,
        },
        {
            nameButton: t('Luogo'),
            idx: 4,
        },
        {
            nameButton: t('Topic'),
            idx: 5,
        },
        {
            nameButton: t('Products'),
            idx: 6,
        },
        !window.location.pathname.includes('grafo') && {
            nameButton: t('Altri filtri'),
            idx: 7,
        },
    ]
    const listingFilters = [
        window.location.pathname.includes('performance') && {
            nameButton: t('Raggruppa'),
            idx: 0,
        },
        {
            nameButton: t('Luogo'),
            idx: 4,
        },
        window.location.pathname.includes('home') && {
            nameButton: t('Stato'),
            idx: 8,
        },
        window.location.pathname.includes('performance') && {
            nameButton: t('Tempo'),
            idx: 3,
        },
    ]

    const [filters, setFilters] = useState(commonFilters)
    const [isListing, setIsListing] = useState(false)
    const [blockSidebar, setBlockSidebar] = useState(false)

    const handleCloseOpenFilter = () => {
        setSelectedFilter({
            key: '',
            label: '',
            svg: '',
        })
        setShowFilter(false)
    }
    const handleSelectFilter = (filter: FilterInterface) => {
        setSelectedFilter(filter)
        setShowFilter(true)
        //setShowFilterList(false)
    }

    const handleClickOutside = () => {
        if (!blockSidebar) {
            setShowFilterList(false)
            setShowFilter(false)
        }
    }

    useEffect(() => {
        if (platformType !== 'listing') {
            loadFilter()
            setFilters(commonFilters)
        } else {
            setFilters(listingFilters)
            setIsListing(true)
        }
    }, [platformType, window.location.pathname])

    const loadFilter = async () => {
        //dispatch(setSelectedFilter(null))
        try {
            const response = await CustomFilterService.getFilters()
            dispatch(setCustomFilterSelectable(response.data))
        } catch (e) {
            console.log('E: ', e)
        }
    }

    const ref = Hooks.useOutsideClick(handleClickOutside)

    return (
        <div ref={ref}>
            {!showFilterList && (
                <FilterBtn onClick={() => setShowFilterList(!showFilterList)} />
            )}
            {showFilterList && (
                <FiltersList
                    setSelectedFilter={handleSelectFilter}
                    blockSidebar={blockSidebar}
                    setBlockSidebar={setBlockSidebar}
                />
            )}
            {showFilter && (
                <Filter
                    filter={selectedFilter}
                    handleCloseOpenFilter={handleCloseOpenFilter}
                />
            )}
        </div>
    )
}

export default FiltersSidebar
