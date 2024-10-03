export interface PeriodProps {
    openHours: number
    openMinutes: number | null
    closeHours: number
    closeMinutes: number | null
}
export interface ListingProps {
    MONDAY: PeriodProps[]
    TUESDAY: PeriodProps[]
    WEDNESDAY: PeriodProps[]
    THURSDAY: PeriodProps[]
    FRIDAY: PeriodProps[]
    SATURDAY: PeriodProps[]
    SUNDAY: PeriodProps[]
    formatted_address?: string
    idAccountLocationGbp?: string
    key?: string
    name?: string
    openInfo?: string
    title?: string
    _id?: string
}
