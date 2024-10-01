export type SectionType = {
    index: number
    type: 'riepilogo' | 'insights' | 'risposte'
}

export type SectionDataType = {
    displayLabel: string
    label: string
    key: 'riepilogo' | 'insights' | 'risposte'
}
