import React, { useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'
import Filter from './Filter/Filter'
import { useTranslation } from 'react-i18next'
import { FilterInterface } from './Filters.interface'

function FiltersSidebar() {
    const [showFilterList, setShowFilterList] = useState(true)
    const [showFilter, setShowFilter] = useState(true)
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

    return (
        <div>
            {!showFilterList && <FilterBtn />}
            {showFilterList && (
                <FiltersList setSelectedFilter={handleSelectFilter} />
            )}
            {showFilter && <Filter filter={selectedFilter} />}
        </div>
    )
}

export default FiltersSidebar
