import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from './ListingMoreHoursTimePicker.module.scss'
import moment, { Moment } from 'moment'
import { formatDataValue } from '../../helpers/editHoursHelpers'
import {
    handleDeleteMoreHoursTimeInterval,
    handleAddingMoreTimeInterval,
} from '../../helpers/editHoursHelpersTyped'
import {
    ListingMoreHoursProps,
    PeriodsMoreHoursProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { weekdaysConstant } from '../../constants/CustomConstants'
import { default as TimePicker } from '../TimePicker/TimePicker'
import Button from '../Button/Button'

dayjs.extend(customParseFormat)

interface ListingMoreHoursTimePickerProps {
    distinctPeriod: PeriodsMoreHoursProps[]
    setDistinctPeriod: React.Dispatch<
        React.SetStateAction<ListingMoreHoursProps | null>
    >
    weekday: (typeof weekdaysConstant)[number]
    periodIndex: number
    hourIndex: number
    lastElementIndex: number
    period: PeriodsMoreHoursProps
    currentPickerIdx: number
}

const ListingMoreHoursTimePicker = ({
    distinctPeriod,
    setDistinctPeriod,
    weekday,
    periodIndex,
    hourIndex,
    lastElementIndex,
    period,
    currentPickerIdx,
}: ListingMoreHoursTimePickerProps) => {
    const [valueStartTime, setValueStartTime] = useState(
        moment(
            formatDataValue(period?.openTime?.hours, period?.openTime?.minutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = useState(
        moment(
            formatDataValue(
                period?.closeTime?.hours,
                period?.closeTime?.minutes
            ),
            'HH:mm:ss'
        )
    )
    const startTime = period
        ? moment({
              hours: period?.openTime?.hours ?? 0,
              minutes: period?.openTime?.minutes ?? 0,
          })
        : null
    const endTime = period
        ? moment({
              hours: period?.closeTime?.hours ?? 0,
              minutes: period?.closeTime?.minutes ?? 0,
          })
        : null

    const onSelectStartTime = (time: Moment) => {
        setValueStartTime(time)

        setDistinctPeriod((prevState: ListingMoreHoursProps | null) => {
            if (prevState && prevState.moreHours) {
                return {
                    ...prevState,
                    moreHours: prevState.moreHours.map((item, idx) => {
                        if (idx === periodIndex) {
                            return {
                                ...item,
                                periods: item.periods.map((period, idx) => {
                                    if (idx === hourIndex) {
                                        return {
                                            ...period,
                                            openTime: {
                                                hours: time
                                                    ? time.hour()
                                                    : null,
                                                minutes: time
                                                    ? time.minute()
                                                    : null,
                                            },
                                        }
                                    }
                                    return period
                                }),
                            }
                        }
                        return item
                    }),
                }
            }
            return prevState
        })
    }

    const onSelectEndTime = (time: Moment) => {
        setValueEndTime(time)

        setDistinctPeriod((prevState: ListingMoreHoursProps | null) => {
            if (prevState && prevState.moreHours) {
                return {
                    ...prevState,
                    moreHours: prevState.moreHours.map((item, idx) => {
                        if (idx === periodIndex) {
                            return {
                                ...item,
                                periods: item.periods.map((period, idx) => {
                                    if (idx === hourIndex) {
                                        return {
                                            ...period,
                                            closeTime: {
                                                hours: time
                                                    ? time.hour()
                                                    : null,
                                                minutes: time
                                                    ? time.minute()
                                                    : null,
                                            },
                                        }
                                    }
                                    return period
                                }),
                            }
                        }
                        return item
                    }),
                }
            }
            return prevState
        })
    }

    useEffect(() => {
        setValueStartTime(
            moment(
                formatDataValue(
                    period?.openTime?.hours,
                    period?.openTime?.minutes
                ),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            moment(
                formatDataValue(
                    period?.closeTime?.hours,
                    period?.closeTime?.minutes
                ),
                'HH:mm:ss'
            )
        )
    }, [period])

    return (
        <div className={styles.timePickerContainer} key={weekday}>
            <div className={styles.timePickers}>
                <TimePicker
                    onChange={onSelectStartTime}
                    value={valueStartTime}
                    variant={'primary'}
                />
                <TimePicker
                    onChange={onSelectEndTime}
                    value={valueEndTime}
                    variant={'primary'}
                />
            </div>
            <div className={styles.actions}>
                {
                    <Button
                        size={'small'}
                        variant={'ghost'}
                        icon={'trashIcon'}
                        arrowPlacement={'center'}
                        iconOnly={true}
                        onClick={() =>
                            handleDeleteMoreHoursTimeInterval(
                                weekday,
                                periodIndex,
                                hourIndex,
                                distinctPeriod,
                                setDistinctPeriod
                            )
                        }
                    />
                }
                {currentPickerIdx === lastElementIndex && (
                    <Button
                        size={'small'}
                        variant={'ghost'}
                        icon={'plusIcon'}
                        arrowPlacement={'center'}
                        iconOnly={true}
                        onClick={() =>
                            handleAddingMoreTimeInterval(
                                weekday,
                                periodIndex,
                                distinctPeriod,
                                setDistinctPeriod
                            )
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default ListingMoreHoursTimePicker
