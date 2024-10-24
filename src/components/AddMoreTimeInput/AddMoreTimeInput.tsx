import { ListingMoreHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import { default as Modal } from '../Modals/ConfirmModal/ConfirmModal'
import styles from './AddMoreTimeInput.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PeriodsMoreHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import { weekdaysConstant } from '../../constants/CustomConstants'
import Checkbox from '../Checkbox/Checkbox'
import ListingMoreHoursTimePicker from '../ListingMoreHoursTimePicker/ListingMoreHoursTimePicker'
import Typography from '../Typography/Typography'
import Button from '../Button/Button'

interface AddMoreTimeInputProps {
    type: string
    index: number
    distinctPeriod: PeriodsMoreHoursProps[]
    setListing: React.Dispatch<
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
    setListing,
    hoursTypeId,
}: AddMoreTimeInputProps) {
    const { t } = useTranslation()
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
            ? initCheckedStatusArray(distinctPeriod)
            : Array(7).fill(false)
    )

    const handleConfirm = async (idx: number) => {
        const confirm = await Modal.confirm({
            content: checkedStatus[idx]
                ? t('Are you sure you want to open your business?')
                : t('Are you sure you want to close your business?'),
            okText: t('Confirm'),
            cancelText: t('Cancel'),
            title: t('Attention'),
        })
        if (!confirm) {
            return
        }
        if (idx === null) return
        setListing((prevState: ListingMoreHoursProps | null) => {
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
                        p.openDay !== weekdaysConstant[idx] &&
                        p.closeDay !== weekdaysConstant[idx]
                ) || []
            tmpDistinctPeriod.moreHours[index].periods.push({
                openDay: weekdaysConstant[idx],
                closeDay: weekdaysConstant[idx],
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
                [idx]: !prevStatus[idx],
            }
        })
    }

    const addEmptyPeriod = (weekday: (typeof weekdaysConstant)[number]) => {
        setListing((prevState: ListingMoreHoursProps | null) => {
            if (!prevState || !prevState.moreHours) {
                return prevState
            }
            const tmpDistinctPeriod = { ...prevState }
            if (!tmpDistinctPeriod || !tmpDistinctPeriod.moreHours) {
                return prevState
            }
            tmpDistinctPeriod.moreHours[index].periods.push({
                openDay: weekday,
                closeDay: weekday,
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
    }

    return (
        <div className={styles.standardContainer}>
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
                            <div className={styles.typographyContainer}>
                                <Typography weight={'bold'} size={'bodyMedium'}>
                                    {t(d)}
                                </Typography>
                            </div>
                            <div key={distinctPeriod?.toString()}>
                                <Checkbox
                                    onClick={() => handleConfirm(i)}
                                    checked={checkedStatus[i]}
                                    value={i}
                                    title={t('Chiuso')}
                                />
                            </div>
                            <div className={styles.timePickerContainer}>
                                {!checkedStatus[i] && (
                                    <div className={styles.timePickerRows}>
                                        {periods?.length > 0 &&
                                            periods?.map((period, idx) => {
                                                return (
                                                    <div key={type + d + i}>
                                                        <ListingMoreHoursTimePicker
                                                            periodIndex={index}
                                                            hourIndex={
                                                                occurrences[idx]
                                                            }
                                                            weekday={d}
                                                            distinctPeriod={
                                                                distinctPeriod
                                                            }
                                                            setListing={
                                                                setListing
                                                            }
                                                            period={period}
                                                            currentPickerIdx={
                                                                idx
                                                            }
                                                            lastElementIndex={
                                                                periods?.length -
                                                                1
                                                            }
                                                        />
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )}
                                {!checkedStatus[i] && (
                                    <div
                                        className={styles.timePickerPlusButton}
                                    >
                                        {periods?.length == 0 && (
                                            <Button
                                                size={'small'}
                                                variant={'ghost'}
                                                icon={'plusIcon'}
                                                arrowPlacement={'center'}
                                                iconOnly={true}
                                                onClick={() =>
                                                    addEmptyPeriod(d)
                                                }
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default AddMoreTimeInput
