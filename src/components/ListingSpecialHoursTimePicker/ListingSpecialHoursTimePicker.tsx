import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from './ListingSpecialHoursTimePicker.module.scss'
import {
    formatDataValue,
    handleAddingSpecialTimeInterval,
    handleDeleteSpecialTimeInterval,
} from '../../helpers/editHoursHelpers'
import {
    SpecialHoursProps,
    IWorkingHours,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { default as TimePicker } from '../TimePicker/TimePicker'
import moment, { Moment } from 'moment'
import Button from '../Button/Button'

dayjs.extend(customParseFormat)

interface ListingSpecialHoursTimePickerProps {
    periodIndex: number
    hourIndex: number
    hour: IWorkingHours
    distinctPeriods: SpecialHoursProps[]
    setDistinctPeriods: React.Dispatch<
        React.SetStateAction<SpecialHoursProps[]>
    >
    lastElementIndex: number
}

function ListingSpecialHoursTimePicker({
    periodIndex,
    hourIndex,
    hour,
    distinctPeriods,
    setDistinctPeriods,
    lastElementIndex,
}: ListingSpecialHoursTimePickerProps) {
    const startDate = distinctPeriods[periodIndex]?.startDate
    const endDate = distinctPeriods[periodIndex]?.endDate

    const [valueStartTime, setValueStartTime] = React.useState(
        moment(
            formatDataValue(hour?.openTime?.hours, hour?.openTime?.minutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = React.useState(
        moment(
            formatDataValue(hour?.closeTime?.hours, hour?.closeTime?.minutes),
            'HH:mm:ss'
        )
    )

    const onSelectStartTime = (time: Moment) => {
        setValueStartTime(time)
        const tmpPeriod = [...distinctPeriods]
        tmpPeriod[periodIndex].hours[hourIndex].openTime = {
            hours: time ? +time.format('H') : 0,
            minutes: time ? +time.format('m') : 0,
        }
        setDistinctPeriods(tmpPeriod)
    }

    const onSelectEndTime = (time: Moment) => {
        setValueEndTime(time)
        const tmpPeriod = [...distinctPeriods]
        tmpPeriod[periodIndex].hours[hourIndex].closeTime = {
            hours: time ? +time.format('H') : 0,
            minutes: time ? +time.format('m') : 0,
        }
        setDistinctPeriods(tmpPeriod)
    }

    React.useEffect(() => {
        setValueStartTime(
            moment(
                formatDataValue(hour?.openTime?.hours, hour?.openTime?.minutes),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            moment(
                formatDataValue(
                    hour?.closeTime?.hours,
                    hour?.closeTime?.minutes
                ),
                'HH:mm:ss'
            )
        )
    }, [hour])

    return (
        <div className={styles.timePickerContainer} key={hourIndex}>
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
                            handleDeleteSpecialTimeInterval(
                                hourIndex,
                                periodIndex,
                                distinctPeriods,
                                setDistinctPeriods
                            )
                        }
                    />
                }
                {hourIndex === lastElementIndex && (
                    <Button
                        size={'small'}
                        variant={'ghost'}
                        icon={'plusIcon'}
                        arrowPlacement={'center'}
                        iconOnly={true}
                        onClick={() =>
                            handleAddingSpecialTimeInterval(
                                startDate,
                                endDate,
                                distinctPeriods,
                                setDistinctPeriods,
                                periodIndex
                            )
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default ListingSpecialHoursTimePicker
