import { weekdaysConstant } from '../../constants/CustomConstants'

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

export interface IDate {
    day: number
    month: number
    year: number
}

export interface IHours {
    hours?: number | null
    minutes?: number | null
}
export interface IWorkingHours {
    openTime?: IHours
    closeTime?: IHours
}
export interface SpecialHoursProps {
    closed?: boolean
    endDate: IDate
    hours: IWorkingHours[]
    openAllDay?: boolean
    startDate: IDate
}
export interface ListingSpecialHoursProps {
    formatted_address?: string
    specialHours: SpecialHoursProps[]
    title?: string
}

export interface PeriodsMoreHoursProps {
    closeDay: (typeof weekdaysConstant)[number]
    openDay: (typeof weekdaysConstant)[number]
    openTime: IHours
    closeTime: IHours
}

export interface IMoreHours {
    hoursTypeId: string
    displayName?: string
    periods: PeriodsMoreHoursProps[]
}

export interface MoreHoursTypes {
    displayName: string
    hoursTypeId: string
    localizeDisplayName: string
}
export interface ListingMoreHoursProps {
    formatted_address: string
    moreHours: IMoreHours[] | null
    moreHoursTypes: MoreHoursTypes[] | null
    title: string
}
