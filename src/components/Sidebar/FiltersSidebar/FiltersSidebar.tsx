import React, { useEffect, useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'
import Filter from './Filter/Filter'
import { useTranslation } from 'react-i18next'
import { FilterInterface } from './Filters.interface'
import Hooks from '../../../utils/hooks/Hooks'
import { useDispatch, useSelector } from 'react-redux'
import CustomFilterService from '../../../services/CustomFilterService'
import { setCustomFilterSelectable } from '../../../store/filters/filtersSlice'
import { RootState } from '../../../store/store'

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
        (state: RootState) => state.Settings.platformType
    )
    const commonFilters = [
        {
            key: 'raggruppa',
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            key: 'fonti',
            svg: 'Topic.svg',
            label: t('Fonti'),
        },
        {
            key: 'channels',
            svg: 'channels.svg',
            label: t('Canali'),
        },
        {
            key: 'tempo',
            svg: 'tempo.svg',
            label: t('Tempo'),
        },
        {
            key: 'location',
            svg: 'location.svg',
            label: t('Luogo'),
        },
        {
            key: 'topic',
            svg: 'topic.svg',
            label: t('Topic'),
        },
        {
            key: 'products',
            svg: 'products.svg',
            label: t('Prodotti'),
        },
        !window.location.pathname.includes('grafo') && {
            key: 'others',
            svg: 'others.svg',
            label: t('Altri'),
        },
        {
            key: 'customFilters',
            svg: 'customFilters.svg',
            label: t('I tuoi filtri'),
        },
    ]
    const listingFilters = [
        window.location.pathname.includes('performance') && {
            key: 'raggruppa',
            svg: 'raggruppa.svg',
            label: t('Raggruppa'),
        },
        {
            key: 'location',
            svg: 'location.svg',
            label: t('Luogo'),
        },
        window.location.pathname.includes('home') && {
            nameButton: t('Stato'),
            key: 'stato',
            svg: 'statp.svg',
            label: t('Stato'),
        },
        window.location.pathname.includes('performance') && {
            key: 'tempo',
            svg: 'tempo.svg',
            label: t('Tempo'),
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
                    filters={filters}
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
