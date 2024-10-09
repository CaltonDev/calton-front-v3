import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TimePicker } from 'antd'
import styles from './ListingSpecialHoursTimePicker.module.scss'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import elimina_svg from '../../assets/img/elimina.svg'
import {
    formatDataValue,
    handleAddingSpecialTimeInterval,
    handleDeleteSpecialTimeInterval,
} from '../../helpers/editHoursHelpers'
import {
    SpecialHoursProps,
    IWorkingHours,
} from '../../pages/ListingEditHours/ListingEditHours.interface'

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
    const [isTimePickerStart, setIsTimePickerStart] = React.useState(false)
    const [isTimePickerEnd, setIsTimePickerEnd] = React.useState(false)

    const [valueStartTime, setValueStartTime] = React.useState(
        dayjs(
            formatDataValue(hour?.openTime?.hours, hour?.openTime?.minutes),
            'HH:mm:ss'
        )
    )
    const [valueEndTime, setValueEndTime] = React.useState(
        dayjs(
            formatDataValue(hour?.closeTime?.hours, hour?.closeTime?.minutes),
            'HH:mm:ss'
        )
    )
    const startTime = hour
        ? moment({
              hours: hour?.openTime?.hours ?? 0,
              minutes: hour?.openTime?.minutes ?? 0,
          })
        : null
    const endTime = hour
        ? moment({
              hours: hour?.closeTime?.hours ?? 0,
              minutes: hour?.closeTime?.minutes ?? 0,
          })
        : null

    const onSelectStartTime = (time: dayjs.Dayjs) => {
        setValueStartTime(time)
        const tmpPeriod = [...distinctPeriods]
        tmpPeriod[periodIndex].hours[hourIndex].openTime = {
            hours: time ? +time.format('H') : 0,
            minutes: time ? +time.format('m') : 0,
        }
        setDistinctPeriods(tmpPeriod)
    }

    const onSelectEndTime = (time: dayjs.Dayjs) => {
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
            dayjs(
                formatDataValue(hour?.openTime?.hours, hour?.openTime?.minutes),
                'HH:mm:ss'
            )
        )
        setValueEndTime(
            dayjs(
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
                    className={styles.picker}
                    onOpenChange={(e) => setIsTimePickerStart(e)}
                    placeholder={`Open at: ${startTime?.format('HH:mm')}`}
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
                    placeholder={`Close at: ${endTime?.format('HH:mm')}`}
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
                        handleDeleteSpecialTimeInterval(
                            hourIndex,
                            periodIndex,
                            distinctPeriods,
                            setDistinctPeriods
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
            {hourIndex === lastElementIndex && (
                <div
                    style={{
                        cursor: 'pointer',
                        marginLeft: '1em',
                        marginRight: 'auto',
                        marginTop: '5px',
                        alignSelf: 'center',
                    }}
                    onClick={() =>
                        handleAddingSpecialTimeInterval(
                            startDate,
                            endDate,
                            distinctPeriods,
                            setDistinctPeriods,
                            periodIndex
                        )
                    }
                >
                    <PlusOutlined style={{ verticalAlign: 0 }} />
                </div>
            )}
        </div>
    )
}

export default ListingSpecialHoursTimePicker
