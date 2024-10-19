export interface CompetitorCardProps {
    elm: any
    name: string
    formatted_address?: string
    meanRating?: number
    meanSentiment?: number
    totRating?: number
    selected?: boolean
    addCompetitor: (arg0: any) => void
}
