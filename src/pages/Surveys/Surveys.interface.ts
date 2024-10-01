export type SectionType = {
    index: number
    type: 'account' | 'smart_response' | 'gruppi' | 'report'
}

export type SectionDataType = {
    displayLabel: string
    label: string
    key: 'account' | 'smart_response' | 'gruppi' | 'report'
}
