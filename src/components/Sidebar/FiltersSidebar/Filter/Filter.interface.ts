type FilterType = {
    key: string
    label: string
    svg: string
}

export type CustomPayload = {
    type: string | undefined
    value: any
    optional?: any | null
    labelDate?: string | null
}

export interface FilterProps {
    filter: FilterType | null
    handleCloseOpenFilter: () => void
}

export interface CustomAutocompleteFilter {
    setPreparedPayload: (arg0: CustomPayload | null) => void
}
