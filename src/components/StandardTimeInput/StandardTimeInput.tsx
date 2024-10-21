import styles from './StandardTimeInput.module.scss'
import React from 'react'
import { weekdaysConstant } from '../../constants/CustomConstants'
import Checkbox from '../Checkbox/Checkbox'
import { useTranslation } from 'react-i18next'
import ListingStandarHoursTimePicker from '../ListingStandardHoursTimePicker/ListingStandarHoursTimePicker'
import {
    ListingProps,
    PeriodProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import ConfirmClosedHoursModal from '../ConfirmClosedHoursModal/ConfirmClosedHoursModal'
import Typography from '../Typography/Typography'
import Button from '../Button/Button'

interface StandardTimeInputProps {
    listing: ListingProps | null
    setListing: React.Dispatch<React.SetStateAction<ListingProps | null>>
}

export const StandardTimeInput = ({
    listing,
    setListing,
}: StandardTimeInputProps) => {
    const { t } = useTranslation()
    const [checkedStatus, setCheckedStatus] = React.useState(
        Array(7).fill(false)
    )
    const [openModal, setOpenModal] = React.useState(false)
    const [checkBoxIdx, setCheckBoxIdx] = React.useState<number | undefined>()

    const handleCheckboxChange = (i: number) => {
        setCheckBoxIdx(i)
        setOpenModal(true)
    }

    const handleConfirm = () => {
        if (checkBoxIdx === undefined) return
        const tmpCheckedList = [...checkedStatus]
        tmpCheckedList[checkBoxIdx] = !tmpCheckedList[checkBoxIdx]
        setCheckedStatus(JSON.parse(JSON.stringify(tmpCheckedList)))

        const tmpListing = JSON.parse(JSON.stringify(listing))
        tmpListing[weekdaysConstant[checkBoxIdx]] = [
            {
                closeHours: null,
                closeMinutes: null,
                openHours: null,
                openMinutes: null,
            },
        ]
        setListing(tmpListing)
        setOpenModal(false)
    }

    const addEmptyPeriod = (weekday: string) => {
        setListing((prev) => {
            if (!prev) return null
            return {
                ...prev,
                [weekday]: [
                    {
                        closeHours: null,
                        closeMinutes: null,
                        openHours: null,
                        openMinutes: null,
                    },
                ],
            }
        })
    }

    React.useEffect(() => {
        const tmpCheckedStatusList = [...checkedStatus]
        weekdaysConstant.forEach((d, i) => {
            if (listing && !listing[d]) {
                tmpCheckedStatusList[i] = true
            }
        })
        setCheckedStatus(tmpCheckedStatusList)
    }, [listing])

    return (
        <div
            className={styles.standardContainer}
            key={weekdaysConstant?.toString()}
        >
            <ConfirmClosedHoursModal
                idx={checkBoxIdx}
                openModal={openModal}
                checkedStatus={checkBoxIdx ? checkedStatus[checkBoxIdx] : false}
                setOpenModal={setOpenModal}
                handleConfirm={handleConfirm}
            />
            {weekdaysConstant.map((d, i) => (
                <div className={styles.openDayRow} key={i}>
                    <div className={styles.dayLabelContainer}>
                        <Typography weight={'bold'} size={'bodyMedium'}>
                            {t(d)}
                        </Typography>
                    </div>
                    <Checkbox
                        onClick={() => handleCheckboxChange(i)}
                        title={t('Chiuso')}
                        checked={checkedStatus[i]}
                        value={i}
                    />
                    <div className={styles.timePickerContainer}>
                        {!checkedStatus[i] &&
                            listing &&
                            listing[d] &&
                            listing?.[d]?.map(
                                (period: PeriodProps, index: number) => {
                                    return (
                                        <ListingStandarHoursTimePicker
                                            key={'standard' + d + index}
                                            listing={listing}
                                            setListing={setListing}
                                            period={period}
                                            weekday={d}
                                            index={index}
                                            lastElementIndex={
                                                listing?.[d]?.length - 1
                                            }
                                        />
                                    )
                                }
                            )}
                        {!checkedStatus[i] &&
                            listing &&
                            listing[d] &&
                            listing[d].length === 0 && (
                                <Button
                                    size={'small'}
                                    variant={'ghost'}
                                    icon={'plusIcon'}
                                    arrowPlacement={'center'}
                                    iconOnly={true}
                                    onClick={() => addEmptyPeriod(d)}
                                />
                            )}
                    </div>
                </div>
            ))}
        </div>
    )
}
