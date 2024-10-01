export type SectionType = {
    index: number
    type: 'riepilogo' | 'insights' | 'risposte'
}

export type SectionDataType = {
    displayLabel: string
    label: string
    key: 'riepilogo' | 'insights' | 'risposte'
}

export interface SurveyRepliesProps {
    data?: any
    sourceId?: any[]
    idColumns?: string
    isFromHome?: boolean
}
