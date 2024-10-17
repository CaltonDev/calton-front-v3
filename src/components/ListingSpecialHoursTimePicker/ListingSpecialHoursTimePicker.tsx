import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
// import { TimePicker } from 'antd'
import styles from './ListingSpecialHoursTimePicker.module.scss'
import {
    CaretDownOutlined,
    CaretRightOutlined,
    PlusOutlined,
} from '@ant-design/icons'
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
import { default as TimePicker } from '../TimePicker/TimePicker'
import moment, { Moment } from 'moment'

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
    // const startTime = hour
    //     ? moment({
    //           hours: hour?.openTime?.hours ?? 0,
    //           minutes: hour?.openTime?.minutes ?? 0,
    //       })
    //     : null
    // const endTime = hour
    //     ? moment({
    //           hours: hour?.closeTime?.hours ?? 0,
    //           minutes: hour?.closeTime?.minutes ?? 0,
    //       })
    //     : null

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
                {/* </div> */}
                {/* <div className={styles.timePickers}> */}
                <TimePicker
                    onChange={onSelectEndTime}
                    value={valueEndTime}
                    variant={'primary'}
                />
            </div>
            <div className={styles.specialHoursActionsContainer}>
                {
                    <div
                        className={styles.deleteSpecialHoursContainer}
                        onClick={() =>
                            handleDeleteSpecialTimeInterval(
                                hourIndex,
                                periodIndex,
                                distinctPeriods,
                                setDistinctPeriods
                            )
                        }
                    >
                        <img
                            className={styles.deleteImg}
                            src={elimina_svg}
                            width="20"
                            height="20"
                            alt=""
                        />
                    </div>
                }
                {hourIndex === lastElementIndex && (
                    <div
                        className={styles.addSpecialHoursContainer}
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
                        <PlusOutlined className={styles.plusOutlined} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListingSpecialHoursTimePicker
