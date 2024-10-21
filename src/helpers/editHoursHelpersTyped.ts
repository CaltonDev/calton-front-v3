import { weekdaysConstant } from '../constants/CustomConstants'
import {
    ListingMoreHoursProps,
    PeriodsMoreHoursProps,
} from '../pages/ListingEditHours/ListingEditHours.interface'

export function handleDeleteMoreHoursTimeInterval(
    weekday: (typeof weekdaysConstant)[number],
    periodIndex: number,
    hourIndex: number,
    distinctPeriod: PeriodsMoreHoursProps[],
    setDistinctPeriod: React.Dispatch<
        React.SetStateAction<ListingMoreHoursProps | null>
    >
) {
    setDistinctPeriod((prev: ListingMoreHoursProps | null) => {
        if (!prev) return null
        const tmp: ListingMoreHoursProps = {
            ...prev,
            moreHours: prev.moreHours
                ? prev.moreHours.map((item, idx) => {
                      if (idx === periodIndex) {
                          return {
                              ...item,
                              periods: item.periods.filter(
                                  (_, i) => i !== hourIndex
                              ),
                          }
                      }
                      return item
                  })
                : null,
        }
        return tmp
    })
}

export function handleAddingMoreTimeInterval(
    weekday: (typeof weekdaysConstant)[number],
    index: number,
    distinctPeriod: PeriodsMoreHoursProps[],
    setDistinctPeriod: React.Dispatch<
        React.SetStateAction<ListingMoreHoursProps | null>
    >
) {
    setDistinctPeriod((prev: ListingMoreHoursProps | null) => {
        if (!prev) return null
        const tmp: ListingMoreHoursProps = {
            ...prev,
            moreHours: prev.moreHours
                ? prev.moreHours.map((item, idx) => {
                      if (idx === index) {
                          return {
                              ...item,
                              periods: [
                                  ...item.periods,
                                  {
                                      openDay: weekday,
                                      closeDay: weekday,
                                      openTime: {
                                          hours: 0,
                                          minutes: 0,
                                      },
                                      closeTime: {
                                          hours: 0,
                                          minutes: 0,
                                      },
                                  },
                              ],
                          }
                      }
                      return item
                  })
                : null,
        }
        return tmp
    })
}
