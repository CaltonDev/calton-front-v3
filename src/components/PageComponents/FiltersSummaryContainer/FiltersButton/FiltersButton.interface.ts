import { AllFiltersState } from '../../../../store/selectors/selectorsSlice'

export interface FiltersButtonProps {
    title?: string
    showCancel?: boolean
    isMore?: boolean
    valueExp?: string | any[]
    filter?: AllFiltersState
    keyUpdate?: string
}
