import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TimePicker } from 'antd'
import styles from './ListingMoreHoursTimePicker.module.scss'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import elimina_svg from '../../assets/img/elimina.svg'
import {
    // handleAddingMoreTimeInterval,
    formatDataValue,
    // handleDeleteMoreHoursTimeInterval,
} from '../../helpers/editHoursHelpers'
import {
    handleDeleteMoreHoursTimeInterval,
    handleAddingMoreTimeInterval,
} from '../../helpers/editHoursHelpersTyped'
import {
    ListingMoreHoursProps,
    PeriodsMoreHoursProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { weekdaysConstant } from '../../constants/CustomConstants'

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
    const [isTimePickerStart, setIsTimePickerStart] = useState(false)
    const [isTimePickerEnd, setIsTimePickerEnd] = useState(false)

    const [valueStartTime, setValueStartTime] = useState(
        dayjs(
            formatDataValue(period?.openTime?.hours, period?.openTime?.minutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = useState(
        dayjs(
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

    const onSelectStartTime = (time: any) => {
        setValueStartTime(time)

        // const currentPeriod = JSON.parse(JSON.stringify(distinctPeriod))

        // currentPeriod.moreHours[periodIndex].periods[hourIndex].openTime = {
        //     hours: time ? time['$H'] : null,
        //     minutes: time ? time['$m'] : null,
        // }

        // setDistinctPeriod(currentPeriod)

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
                                                hours: time ? time['$H'] : null,
                                                minutes: time
                                                    ? time['$m']
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

    const onSelectEndTime = (time: any) => {
        setValueEndTime(time)

        // const currentPeriod = JSON.parse(JSON.stringify(distinctPeriod))
        // const currentPeriod = { ...distinctPeriod }

        // currentPeriod.moreHours[periodIndex].periods[hourIndex].closeTime = {
        //     hours: time ? time['$H'] : null,
        //     minutes: time ? time['$m'] : null,
        // }
        // currentPeriod[hourIndex].closeTime = {
        //     hours: time ? time['$H'] : null,
        //     minutes: time ? time['$m'] : null,
        // }

        // setDistinctPeriod(currentPeriod)
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
                                                hours: time ? time['$H'] : null,
                                                minutes: time
                                                    ? time['$m']
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
        const formatedDate = formatDataValue(
            period?.openTime?.hours,
            period?.openTime?.minutes
        )
        setValueStartTime(
            dayjs(
                formatDataValue(
                    period?.openTime?.hours,
                    period?.openTime?.minutes
                ),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            dayjs(
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
                    className={styles.picker}
                    onOpenChange={(e) => setIsTimePickerStart(e)}
                    // placeholder={`Open at: ${startTime.format('HH:mm')}`}
                    onChange={onSelectStartTime}
                    suffixIcon={
                        isTimePickerStart ? (
                            <CaretDownOutlined />
                        ) : (
                            <CaretRightOutlined />
                        )
                    }
                    format="HH:mm"
                    // picker="time"
                    minuteStep={5}
                    value={valueStartTime}
                />
            </div>
            <div className={styles.timePickers}>
                <TimePicker
                    className={styles.picker}
                    onOpenChange={(e) => setIsTimePickerEnd(e)}
                    // placeholder={`Close at: ${endTime.format('HH:mm')}`}
                    onChange={onSelectEndTime}
                    suffixIcon={
                        isTimePickerEnd ? (
                            <CaretDownOutlined />
                        ) : (
                            <CaretRightOutlined />
                        )
                    }
                    format="HH:mm"
                    // picker="time"
                    minuteStep={5}
                    value={valueEndTime}
                />
            </div>
            {
                <div
                    onClick={() =>
                        handleDeleteMoreHoursTimeInterval(
                            weekday,
                            periodIndex,
                            hourIndex,
                            distinctPeriod,
                            setDistinctPeriod
                        )
                    }
                    style={{ alignSelf: 'center', marginLeft: '1em' }}
                >
                    <img
                        style={{ cursor: 'pointer' }}
                        src={elimina_svg}
                        width="20"
                        height="20"
                        alt=""
                    />
                </div>
            }
            {currentPickerIdx === lastElementIndex && (
                <div
                    style={{
                        cursor: 'pointer',
                        marginLeft: '1em',
                        marginRight: 'auto',
                        marginTop: '5px',
                        alignSelf: 'center',
                    }}
                    onClick={() =>
                        handleAddingMoreTimeInterval(
                            weekday,
                            periodIndex,
                            distinctPeriod,
                            setDistinctPeriod
                        )
                    }
                >
                    <PlusOutlined style={{ verticalAlign: 0 }} />
                </div>
            )}
        </div>
    )
}

export default ListingMoreHoursTimePicker
