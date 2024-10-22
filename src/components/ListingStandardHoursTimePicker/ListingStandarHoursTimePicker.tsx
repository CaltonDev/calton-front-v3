import styles from './ListingStandardHoursTimePicker.module.scss'
import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
    formatDataValue,
    handleDeleteTimeInterval,
    handleAddingTimeInterval,
} from '../../helpers/editHoursHelpers'
import {
    ListingProps,
    PeriodProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { Weekdays } from '../../constants/CustomConstants'
import moment, { Moment } from 'moment'
import { default as TimePicker } from '../TimePicker/TimePicker'
import Button from '../Button/Button'

dayjs.extend(customParseFormat)

interface ListingStandarHoursTimePickerProps {
    listing: ListingProps | null
    setListing: React.Dispatch<React.SetStateAction<ListingProps | null>>
    period: PeriodProps
    weekday: Weekdays
    index: number
    lastElementIndex: number
}

const ListingStandarHoursTimePicker = ({
    listing,
    setListing,
    period,
    weekday,
    index,
    lastElementIndex,
}: ListingStandarHoursTimePickerProps) => {
    const [valueStartTime, setValueStartTime] = React.useState(
        moment(
            formatDataValue(period?.openHours, period?.openMinutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = React.useState(
        moment(
            formatDataValue(period?.closeHours, period?.closeMinutes),
            'HH:mm:ss'
        )
    )
    const startTime = period
        ? moment({
              hours: period?.openHours,
              minutes: period?.openMinutes ?? 0,
          })
        : null
    const endTime = period
        ? moment({
              hours: period?.closeHours,
              minutes: period?.closeMinutes ?? 0,
          })
        : null

    const onSelectStartTime = (time: Moment) => {
        if (!time) return
        setValueStartTime(time)
        if (!listing) return
        const currentList = { ...listing }

        if (!currentList[weekday]) {
            return
        }

        currentList[weekday][index] = {
            ...period,
            openHours: time ? +time.format('H') : 0,
            openMinutes: time ? +time.format('m') : 0,
        }
        setListing(currentList)
    }

    const onSelectEndTime = (time: Moment) => {
        setValueEndTime(time)
        if (!listing) return
        const currentList = { ...listing }

        if (
            !currentList[weekday] ||
            !currentList[weekday][index] ||
            !currentList
        ) {
            return
        }

        currentList[weekday][index] = {
            ...period,
            closeHours: time ? +time.format('H') : 0,
            closeMinutes: time ? +time.format('m') : 0,
        }
        setListing(currentList)
    }

    React.useEffect(() => {
        setValueStartTime(
            moment(
                formatDataValue(period?.openHours, period?.openMinutes),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            moment(
                formatDataValue(period?.closeHours, period?.closeMinutes),
                'HH:mm:ss'
            )
        )
    }, [period])

    return (
        <div className={styles.timePickerContainer}>
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
                            handleDeleteTimeInterval(
                                weekday,
                                startTime,
                                endTime,
                                index,
                                setListing,
                                listing
                            )
                        }
                    />
                }
                {index === lastElementIndex && (
                    <Button
                        size={'small'}
                        variant={'ghost'}
                        icon={'plusIcon'}
                        arrowPlacement={'center'}
                        iconOnly={true}
                        onClick={() =>
                            handleAddingTimeInterval(weekday, setListing)
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default ListingStandarHoursTimePicker
