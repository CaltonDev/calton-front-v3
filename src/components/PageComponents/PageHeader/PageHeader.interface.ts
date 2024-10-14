export interface PageHeaderProps {
    heading: string
    subheading?: boolean | string
    previousPage?: string
    setPreviousState?: (arg0: boolean) => void
    arrowBackUrl?: string
    showArrowBack?: boolean
    hideFilters?: boolean
    bulkEdit?: boolean
}
