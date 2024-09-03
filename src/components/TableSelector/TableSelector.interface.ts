import * as React from 'react'

type DataType = {
    key: string
    label: string
    data: any
    svg?: string
}
export interface TableSelectorProps {
    data?: DataType[] | []
    fullyLoaded?: boolean
    downloadble?: boolean
    onDownload?: () => void
}
