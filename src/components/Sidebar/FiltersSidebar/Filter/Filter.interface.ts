type FilterType = {
    key: string
    label: string
    svg: string
}

export interface FilterProps {
    filter: FilterType | null
}
