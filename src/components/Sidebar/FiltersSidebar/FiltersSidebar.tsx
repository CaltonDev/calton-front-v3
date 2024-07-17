import React, { useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'

function FiltersSidebar() {
    const [showFilterList, setShowFilterList] = useState(true)
    return (
        <div>
            <FilterBtn />
            {showFilterList && <FiltersList />}
        </div>
    )
}

export default FiltersSidebar
