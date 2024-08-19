import * as React from 'react'
export interface TableProps {
    columnsData?: any
    data?: any
    fullyLoaded?: boolean
    fetchData?: (arg0: any, arg1: any) => void
}
