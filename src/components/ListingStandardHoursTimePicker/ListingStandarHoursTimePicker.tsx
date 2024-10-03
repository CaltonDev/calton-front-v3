import styles from './ListingStandardHoursTimePicker.module.scss'
import React from 'react'
import CustomTimePicker from '../CustomTimePicker/CustomTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
    formatDataValue,
    handleDeleteTimeInterval,
    handleAddingTimeInterval,
} from '../../helpers/editHoursHelpers'
import { TimePicker } from 'antd'
import {
    ListingProps,
    PeriodProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { Weekdays } from '../../constants/CustomConstants'
import moment from 'moment'
import elimina_svg from '../../assets/img/elimina.svg'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'

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
        dayjs(
            formatDataValue(period?.openHours, period?.openMinutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = React.useState(
        dayjs(
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

    const onSelectStartTime = (time: Dayjs) => {
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

    const onSelectEndTime = (time: Dayjs) => {
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
            closeHours: time ? +time.format('$H') : 0,
            closeMinutes: time ? +time.format('$m') : 0,
        }
        setListing(currentList)
    }

    React.useEffect(() => {
        setValueStartTime(
            dayjs(
                formatDataValue(period?.openHours, period?.openMinutes),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            dayjs(
                formatDataValue(period?.closeHours, period?.closeMinutes),
                'HH:mm:ss'
            )
        )
    }, [period])

    return (
        <div className={styles.timePickerContainer} key={weekday}>
            <div className={styles.timePickers}>
                <TimePicker
                    className={styles.picker}
                    value={valueStartTime}
                    onChange={onSelectStartTime}
                    format={'HH:mm'}
                    minuteStep={5}
                />
            </div>
            <div className={styles.timePickers}>
                <TimePicker
                    className={styles.picker}
                    value={valueEndTime}
                    onChange={onSelectEndTime}
                    format={'HH:mm'}
                    minuteStep={5}
                />
            </div>
            {
                <div
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
            {index === lastElementIndex && (
                <div
                    style={{
                        cursor: 'pointer',
                        marginLeft: '1em',
                        marginRight: 'auto',
                        marginTop: '5px',
                        alignSelf: 'center',
                    }}
                    onClick={() =>
                        handleAddingTimeInterval(weekday, setListing)
                    }
                >
                    <PlusOutlined style={{ verticalAlign: 0 }} />
                </div>
            )}
        </div>
    )
}

export default ListingStandarHoursTimePicker
