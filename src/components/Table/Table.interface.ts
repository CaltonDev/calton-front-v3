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
}
