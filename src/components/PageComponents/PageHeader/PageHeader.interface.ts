export interface PageHeaderProps {
    heading: string
    subheading?: boolean | string
    previousPage?: string
    setPreviousState?: (arg0: boolean) => void
    arrowBackUrl?: string
    showArrowBack?: boolean
    hideFilters?: boolean
    bulkEdit?: boolean
    dropdownData?: any
    isOnBulkEdit?: boolean
    setIsOnBulkEdit?: (arg0: boolean) => void
    selectAllListing?: () => void
    allSelected?: boolean
    bulkOperationType?: string
    bulkBtnDisabled?: boolean
    bulkList?: any[]
}
