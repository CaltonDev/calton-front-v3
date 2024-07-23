import React, { RefObject, useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'
import Filter from './Filter/Filter'
import { useTranslation } from 'react-i18next'
import { FilterInterface } from './Filters.interface'
import Hooks from '../../../utils/hooks/Hooks'

function FiltersSidebar() {
    const [showFilterList, setShowFilterList] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const { t } = useTranslation()
    const [selectedFilter, setSelectedFilter] = useState<FilterInterface>({
        key: '',
        label: '',
        svg: '',
    })

    const handleSelectFilter = (filter: FilterInterface) => {
        setSelectedFilter(filter)
        setShowFilter(true)
        //setShowFilterList(false)
    }

    const handleClickOutside = () => {
        setShowFilterList(false)
        setShowFilter(false)
    }

    const ref = Hooks.useOutsideClick(handleClickOutside)

    return (
        <div ref={ref}>
            {!showFilterList && (
                <FilterBtn onClick={() => setShowFilterList(!showFilterList)} />
            )}
            {showFilterList && (
                <FiltersList setSelectedFilter={handleSelectFilter} />
            )}
            {showFilter && <Filter filter={selectedFilter} />}
        </div>
    )
}

export default FiltersSidebar
