import * as React from 'react'
import i18next from 'i18next'
interface AllFilters {
    startDate: string
    endDate: string
    selectedLocation: string[]
    selectedChannel: string[]
    selectedTopics: string[]
    selectedProducts: string[]
    selectedSource: string[]
    groupby: string
    customFilters: any // Adjust type as per your application's customFilters type
}

export interface CommonServiceProps {
    allFilters: AllFilters
    dispatch: any
    numCommons: number
    t: typeof i18next.t
}
export interface WordsCountBubbleProps extends CommonServiceProps {}
