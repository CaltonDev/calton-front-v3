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
import { TimePicker as AntdTimePicker } from 'antd'
import {
    ListingProps,
    PeriodProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { Weekdays } from '../../constants/CustomConstants'
import moment, { Moment } from 'moment'
import elimina_svg from '../../assets/img/elimina.svg'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import { default as RCTimePicker } from 'rc-time-picker'
import { default as TimePicker } from '../TimePicker/TimePicker'
import { IoIosArrowDown } from 'react-icons/io'

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
        <>
            {/* <div className={styles.timePickerContainer} key={weekday}> */}
            <div className={styles.timePickers}>
                {/* <div className={styles.timePickerWrapper}> */}
                <TimePicker
                    onChange={onSelectStartTime}
                    value={valueStartTime}
                    variant={'primary'}
                />
                {/* </div> */}
                {/* </div> */}
                {/* <div className={styles.timePickers}> */}
                {/* <div className={styles.timePickerWrapper}> */}
                <TimePicker
                    onChange={onSelectEndTime}
                    value={valueEndTime}
                    variant={'primary'}
                />
                {/* </div> */}
            </div>
            {
                <div
                    className={styles.deleteTimeIntervalContainer}
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
                    // style={{ alignSelf: 'center', marginLeft: '1em' }}
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
            {/* </div> */}
        </>
    )
}

export default ListingStandarHoursTimePicker
