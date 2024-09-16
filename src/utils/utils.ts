import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    endOfYear,
    addYears,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays,
} from 'date-fns'
import i18next from 'i18next'
import {
    competitorsColor,
    listingsColor,
    reviewsColor,
    settingsColor,
    surveysColor,
} from '../constants/constants'

const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    endOfLastYear: startOfDay(addYears(new Date(), -1)),
}

interface Range {
    label: string
    startDate: Date
    endDate: Date
}

const staticRangeHandler = {
    range: {} as Range,
    isSelected(range: Range): boolean {
        const definedRange = this.range as Range
        return (
            isSameDay(range.startDate, definedRange.startDate) &&
            isSameDay(range.endDate, definedRange.endDate)
        )
    },
}

export function createStaticRanges(ranges: Range[]) {
    return ranges.map((range) => ({ ...staticRangeHandler, ...range }))
}

export const defaultStaticRanges = (t: typeof i18next.t) =>
    createStaticRanges([
        {
            label: t('Oggi'),
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        },
        {
            label: t('Ieri'),
            startDate: defineds.startOfYesterday,
            endDate: defineds.endOfYesterday,
        },

        {
            label: t('Settimana Corrente'),
            startDate: defineds.startOfWeek,
            endDate: defineds.endOfWeek,
        },
        {
            label: t('Settimana Precedente'),
            startDate: defineds.startOfLastWeek,
            endDate: defineds.endOfLastWeek,
        },
        {
            label: t('Mese Corrente'),
            startDate: defineds.startOfMonth,
            endDate: new Date(),
        },
        {
            label: t('Mese Precedente'),
            startDate: defineds.startOfLastMonth,
            endDate: defineds.endOfLastMonth,
        },
        {
            label: t('Anno Corrente'),
            startDate: defineds.endOfLastYear,
            endDate: defineds.startOfToday,
        },
        {
            label: t('Sempre'),
            startDate: new Date('1970-01-01'),
            endDate: defineds.endOfToday,
        },
    ])

export const getBackgroundColor = (platformType: string) => {
    return platformType === 'reviews'
        ? reviewsColor
        : platformType === 'surveys'
          ? surveysColor
          : platformType === 'competitor'
            ? competitorsColor
            : platformType === 'white'
              ? '#FFFFFF'
              : platformType === 'settings'
                ? settingsColor
                : listingsColor
}

export const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
        event.preventDefault()
    }
}
