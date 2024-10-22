type Pagination = {
    pageIndex: number
    pageSize: number
}
export interface TableProps {
    columnsData?: any
    data?: any
    fullyLoaded?: boolean
    fetchData?: (arg0: any, arg1: any) => void
    customHeight?: string
    bottomNavigator?: boolean
    pagination: Pagination
    setPagination: (arg0: Pagination) => void
    customToggleButton?: {
        leftValue: {
            label: string
            value: string
        }
        rightValue: {
            label: string
            value: string
        }
        currentState: string
        handleToggle: (arg?: any) => void
    }
    totalItems?: number | undefined
    handleEditIconClick?: (arg0: any, arg1: any) => void
    openCalendarButton?: boolean
}
