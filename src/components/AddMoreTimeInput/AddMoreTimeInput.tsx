import { ListingMoreHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import ConfirmClosedHoursModal from '../ConfirmClosedHoursModal/ConfirmClosedHoursModal'
import styles from './AddMoreTimeInput.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PeriodsMoreHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import { weekdaysConstant } from '../../constants/CustomConstants'
import { handleAddingMoreTimeInterval } from '../../helpers/editHoursHelpers'
import { PlusOutlined } from '@ant-design/icons'
import Checkbox from '../Checkbox/Checkbox'
import ListingMoreHoursTimePicker from '../ListingMoreHoursTimePicker/ListingMoreHoursTimePicker'

interface AddMoreTimeInputProps {
    type: string
    index: number
    // distinctPeriod: ListingMoreHoursProps
    distinctPeriod: PeriodsMoreHoursProps[]
    setDistinctPeriod: React.Dispatch<
        React.SetStateAction<ListingMoreHoursProps | null>
    >
    listing: ListingMoreHoursProps | null
    hoursTypeId: string
}

function AddMoreTimeInput({
    listing,
    type,
    index,
    distinctPeriod,
    setDistinctPeriod,
    hoursTypeId,
}: AddMoreTimeInputProps) {
    const { t } = useTranslation()
    // const [allPeriods, setAllPeriods] = React.useState(
    //     distinctPeriod &&
    //         'moreHours' in distinctPeriod &&
    //         distinctPeriod.moreHours
    //         ? distinctPeriod?.moreHours[index]?.periods
    //         : []
    // )
    // const [allPeriods, setAllPeriods] =
    //     React.useState<PeriodsMoreHoursProps[]>(distinctPeriod)
    const initCheckedStatusArray = (periods: PeriodsMoreHoursProps[]) => {
        const tmpCheckedStatus = Array(7).fill(false)
        weekdaysConstant.forEach((d, i) => {
            const period = periods?.filter(
                (p: PeriodsMoreHoursProps) =>
                    p.openDay === d && p.closeDay === d
            )
            if (period?.length === 0) {
                tmpCheckedStatus[i] = true
            }
        })

        return tmpCheckedStatus
    }
    const [checkedStatus, setCheckedStatus] = React.useState(
        distinctPeriod
            ? // 'moreHours' in distinctPeriod &&
              // distinctPeriod.moreHours
              // ? initCheckedStatusArray(distinctPeriod?.moreHours[index]?.periods)
              initCheckedStatusArray(distinctPeriod)
            : Array(7).fill(false)
        //   false
    )
    const [openModal, setOpenModal] = React.useState(false)
    const [checkBoxIdx, setCheckBoxIdx] = React.useState<number | null>(null)

    const handleCheckboxChange = (i: number | null) => {
        setCheckBoxIdx(i)
        setOpenModal(true)
    }
    const handleAddMore = (weekday: (typeof weekdaysConstant)[number]) => {
        // handleAddingMoreTimeInterval(
        //     weekday,
        //     index,
        //     distinctPeriod,
        //     setDistinctPeriod
        // )
        console.log('add more')
    }

    // const handleConfirmOld = () => {
    //     if (checkBoxIdx === null) return
    //     let tmpDistinctPeriod = JSON.parse(JSON.stringify(distinctPeriod))
    //     // tmpDistinctPeriod.moreHours[index].periods =
    //     //     tmpDistinctPeriod.moreHours[index]?.periods?.filter(
    //     //         (p: any) =>
    //     //             p.openDay !== weekdaysConstant[checkBoxIdx] &&
    //     //             p.closeDay !== weekdaysConstant[checkBoxIdx]
    //     //     )
    //     tmpDistinctPeriod = tmpDistinctPeriod.filter(
    //         (p: any) =>
    //             p.openDay !== weekdaysConstant[checkBoxIdx] &&
    //             p.closeDay !== weekdaysConstant[checkBoxIdx]
    //     )
    //     // tmpDistinctPeriod.moreHours[index].periods.push({
    //     tmpDistinctPeriod.push({
    //         openDay: weekdaysConstant[checkBoxIdx],
    //         closeDay: weekdaysConstant[checkBoxIdx],
    //         openTime: {
    //             hours: null,
    //             minutes: null,
    //         },
    //         closeTime: {
    //             hours: null,
    //             minutes: null,
    //         },
    //     })
    //     setDistinctPeriod(tmpDistinctPeriod)

    //     setCheckedStatus((prevStatus) => ({
    //         ...prevStatus,
    //         [checkBoxIdx]: !prevStatus[checkBoxIdx],
    //     }))

    //     setOpenModal(false)
    // }

    const handleConfirm = () => {
        if (checkBoxIdx === null) return
        setDistinctPeriod((prevState: ListingMoreHoursProps | null) => {
            if (!prevState || !prevState.moreHours) {
                return prevState
            }
            const tmpDistinctPeriod = { ...prevState }
            if (!tmpDistinctPeriod || !tmpDistinctPeriod.moreHours) {
                return prevState
            }
            tmpDistinctPeriod.moreHours[index].periods =
                tmpDistinctPeriod.moreHours[index]?.periods?.filter(
                    (p: PeriodsMoreHoursProps) =>
                        p.openDay !== weekdaysConstant[checkBoxIdx] &&
                        p.closeDay !== weekdaysConstant[checkBoxIdx]
                ) || []
            tmpDistinctPeriod.moreHours[index].periods.push({
                openDay: weekdaysConstant[checkBoxIdx],
                closeDay: weekdaysConstant[checkBoxIdx],
                openTime: {
                    hours: null,
                    minutes: null,
                },
                closeTime: {
                    hours: null,
                    minutes: null,
                },
            })
            return tmpDistinctPeriod
        })
        setCheckedStatus((prevStatus) => {
            return {
                ...prevStatus,
                [checkBoxIdx]: !prevStatus[checkBoxIdx],
            }
        })
        setOpenModal(false)
    }

    return (
        <div className={styles.standardContainer}>
            <ConfirmClosedHoursModal
                idx={checkBoxIdx}
                openModal={openModal}
                checkedStatus={checkBoxIdx ? checkedStatus[checkBoxIdx] : false}
                setOpenModal={setOpenModal}
                handleConfirm={handleConfirm}
            />
            {distinctPeriod &&
                weekdaysConstant.map((d, i) => {
                    const periods = distinctPeriod?.filter(
                        (p) => p.openDay === d && p.closeDay === d
                    )
                    const occurrences = distinctPeriod?.reduce<number[]>(
                        function (result, p, i) {
                            if (p.openDay === d && p.closeDay === d) {
                                result.push(i)
                            }
                            return result
                        },
                        []
                    )

                    return (
                        <div key={i} className={styles.openDayRow}>
                            <div className={styles.dayTitle}>
                                <span>{d}</span>
                            </div>
                            <div
                                className={styles.dayCheckbox}
                                key={distinctPeriod?.toString()}
                            >
                                <Checkbox
                                    onClick={() => handleCheckboxChange(i)}
                                    checked={checkedStatus[i]}
                                    value={i}
                                    title={checkedStatus[i] ? t('Chiuso') : ''}
                                />
                            </div>
                            <div className={styles.timePickerContainer}>
                                <div className={styles.timePickerRow}>
                                    {!checkedStatus[i] && (
                                        <div className={styles.timePickerRow}>
                                            {periods?.length > 0 ? (
                                                periods?.map((period, idx) => {
                                                    return (
                                                        <div key={type + d + i}>
                                                            <ListingMoreHoursTimePicker
                                                                periodIndex={
                                                                    index
                                                                }
                                                                hourIndex={
                                                                    occurrences[
                                                                        idx
                                                                    ]
                                                                }
                                                                weekday={d}
                                                                distinctPeriod={
                                                                    distinctPeriod
                                                                }
                                                                setDistinctPeriod={
                                                                    setDistinctPeriod
                                                                }
                                                                period={period}
                                                                currentPickerIdx={
                                                                    idx
                                                                }
                                                                lastElementIndex={
                                                                    periods?.length -
                                                                    1
                                                                }
                                                                // hoursTypeId={
                                                                //     hoursTypeId
                                                                // }
                                                            />
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginLeft: '1em',
                                                        marginRight: 'auto',
                                                        alignSelf: 'center',
                                                    }}
                                                >
                                                    {/* <PlusOutlined
                                                        style={{
                                                            verticalAlign: 0,
                                                        }}
                                                        onClick={() =>
                                                            handleAddMore(d)
                                                        }
                                                    /> */}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default AddMoreTimeInput
