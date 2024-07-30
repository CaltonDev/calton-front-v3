import { AllFiltersState } from '../../../../store/selectors/selectorsSlice'

export interface FiltersButtonProps {
    title: string
    showCancel?: boolean
    isMore?: boolean
    value?: string | any[]
    filter?: AllFiltersState
    keyUpdate?: string
    setShowAllFilters?: (arg0: boolean) => void
    showAllFilters?: boolean
}
