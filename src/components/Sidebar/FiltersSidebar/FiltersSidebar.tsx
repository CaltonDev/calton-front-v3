import React, { useState } from 'react'
import FilterBtn from './FilterBtn/FilterBtn'
import FiltersList from './FiltersList/FiltersList'
import Filter from './Filter/Filter'
import { useTranslation } from 'react-i18next'

function FiltersSidebar() {
    const [showFilterList, setShowFilterList] = useState(false)
    const [showFilter, setShowFilter] = useState(true)
    const { t } = useTranslation()
    const filter = {
        key: 'raggruppa',
        svg: 'raggruppa.svg',
        label: t('Raggruppa'),
    }
    return (
        <div>
            <FilterBtn />
            {showFilterList && <FiltersList />}
            {showFilter && <Filter filter={filter} />}
        </div>
    )
}

export default FiltersSidebar
