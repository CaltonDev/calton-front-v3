import styles from './SpecialHours.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import {
    ListingProps,
    ListingSpecialHoursProps,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import { useSelector, useDispatch } from 'react-redux'
import { manageLocalToastWSAndReload } from '../../helpers/helpers'
import { SpecialHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import Tooltip from 'rc-tooltip'
import useEditHours from '../../utils/hooks/useEditHours'
import Button from '../Button/Button'
import SpecialTimeInput from '../SpecialTimeInput/SpecialTimeInput'

interface SpecialHoursComponentProps {
    listing: ListingSpecialHoursProps | null
    refetch?: () => void
    selectedListings?: string[]
    toOverwrite?: boolean
}

function SpecialHours({
    listing,
    selectedListings,
    refetch,
    toOverwrite = true,
}: SpecialHoursComponentProps) {
    const { t } = useTranslation()
    const mutation = useEditHours()
    const dispatch = useDispatch()
    const [distinctPeriods, setDistinctPeriods] = React.useState(
        listing?.specialHours ? listing?.specialHours : []
    )
    const socketMessage = useSelector((state: any) => state?.Socket?.message)
    const consumeLocallySocket = useSelector(
        (state: any) => state?.Socket?.consumeLocally
    )

    const addEmptyDate = () => {
        const currentDate = new Date()
        const newPeriod: SpecialHoursProps = {
            startDate: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
            },
            endDate: {
                year: currentDate.getFullYear(),
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
            },
            hours: [
                {
                    openTime: {
                        hours: null,
                        minutes: null,
                    },
                    closeTime: {
                        hours: null,
                        minutes: null,
                    },
                },
            ],
        }

        setDistinctPeriods([...distinctPeriods, newPeriod])
    }

    const handleRemovePeriod = (index: number) => {
        const tmpArray = [...distinctPeriods]
        tmpArray.splice(index, 1)
        setDistinctPeriods(tmpArray)
    }

    const handleSave = () => {
        const listingsToEdit =
            selectedListings instanceof Array
                ? selectedListings
                : [selectedListings]

        mutation.mutate({
            hours: distinctPeriods,
            listingsName: listingsToEdit,
            isRegular: false,
            isSpecial: true,
            isMore: false,
            isNotSpecified: true,
            isTemporarilyClosed: false,
            isPermanentlyClosed: false,
            toOverwrite: toOverwrite,
            queryStr: 'specialHours',
        })
    }

    React.useEffect(() => {
        let currMsg: { type?: string } = {}

        if (socketMessage instanceof Array) {
            currMsg = socketMessage[0]
        }
        try {
            if (currMsg?.type === 'updateBulk') {
                manageLocalToastWSAndReload(currMsg, refetch, dispatch, t)
            }
        } catch (err) {}
    }, [consumeLocallySocket])

    return (
        <div className={styles.hoursContainer}>
            <div className={styles.dateHours} key={distinctPeriods?.toString()}>
                {distinctPeriods?.map((period, idx) => {
                    return (
                        <div
                            style={{ margin: '1em 0' }}
                            key={period?.toString() + idx}
                        >
                            <span style={{ fontWeight: 700, fontSize: '1em' }}>
                                {t('Data')}
                            </span>
                            <Tooltip
                                // style={{ margin: '0 auto' }}
                                overlay={t('Elimina')}
                                placement={'top'}
                            >
                                {/* <Button
                                    icon={'trashIcon'}
                                    iconOnly={true}
                                    iconColor={'white'}
                                    variant={'outline'}
                                    onClick={() => handleRemovePeriod(idx)}
                                /> */}
                                <button>
                                    <BsTrash
                                        onClick={() => handleRemovePeriod(idx)}
                                    />
                                </button>
                            </Tooltip>
                            <SpecialTimeInput
                                index={idx}
                                distinctPeriods={distinctPeriods}
                                setDistinctPeriods={setDistinctPeriods}
                                period={period}
                            />
                        </div>
                    )
                })}
                <div style={{ marginTop: 20 }}>
                    <span onClick={addEmptyDate} className={styles.addDate}>
                        {t('+ Aggiungi una data')}
                    </span>
                </div>
            </div>
            <div className={styles.footer}>
                <div>
                    <Button
                        // type="text"
                        className={styles.cancelButton}
                    >
                        {t('Annulla')}
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={handleSave}
                        className={styles.saveButton}
                        // type="primary"
                        // shape="round"
                    >
                        {t('Salva')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SpecialHours
