import styles from './SpecialHoursList.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { ListingSpecialHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import { useSelector, useDispatch } from 'react-redux'
import { manageLocalToastWSAndReload } from '../../helpers/helpers'
import { SpecialHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import useEditHours from '../../utils/hooks/useEditHours'
import Button from '../Button/Button'
import SpecialTimeInput from '../SpecialTimeInput/SpecialTimeInput'
import Typography from '../Typography/Typography'
import { isUndefined } from 'lodash'

interface SpecialHoursComponentProps {
    listing: ListingSpecialHoursProps | null
    refetch?: () => void
    selectedListings?: string[]
    toOverwrite?: boolean
    index?: number
}

function SpecialHoursList({
    listing,
    selectedListings,
    refetch,
    toOverwrite = true,
    index,
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

    // const addEmptyDate = () => {
    //     const currentDate = new Date()
    //     const newPeriod: SpecialHoursProps = {
    //         startDate: {
    //             year: currentDate.getFullYear(),
    //             month: currentDate.getMonth() + 1,
    //             day: currentDate.getDate(),
    //         },
    //         endDate: {
    //             year: currentDate.getFullYear(),
    //             month: currentDate.getMonth() + 1,
    //             day: currentDate.getDate(),
    //         },
    //         hours: [
    //             {
    //                 openTime: {
    //                     hours: null,
    //                     minutes: null,
    //                 },
    //                 closeTime: {
    //                     hours: null,
    //                     minutes: null,
    //                 },
    //             },
    //         ],
    //     }

    //     setDistinctPeriods([...distinctPeriods, newPeriod])
    // }

    // const handleRemovePeriod = (index: number) => {
    //     const tmpArray = [...distinctPeriods]
    //     tmpArray.splice(index, 1)
    //     setDistinctPeriods(tmpArray)
    // }

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

    const handleCancelMoreHours = () => {
        // setDistinctPeriods([])
        // setDistinctPeriods(listing?.specialHours ? listing?.specialHours : [])
        refetch && refetch()
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

    React.useEffect(() => {
        setDistinctPeriods(listing?.specialHours ? listing?.specialHours : [])
    }, [listing])

    return (
        <div className={styles.hoursContainer}>
            <div className={styles.specialHoursTitleContainer}>
                <div className={styles.labelContainer}>
                    <Typography weight={'bold'} size={'h5'}>
                        {!isUndefined(index)
                            ? `${distinctPeriods[index]?.startDate?.day}/${distinctPeriods[index]?.startDate?.month}/${distinctPeriods[index]?.startDate?.year}`
                            : ''}
                    </Typography>
                    {/* <Typography weight={'normal'} size={'bodyMedium'}>
                        {t(
                            "Conferma l'orario per i giorni di festa per indicare ai tuoi clienti le aperture della tua attività."
                        )}
                    </Typography> */}
                </div>
                {distinctPeriods.length > 0 && (
                    <div className={styles.buttonContainer}>
                        <Button
                            onClick={handleCancelMoreHours}
                            size="small"
                            variant="outline"
                        >
                            {t('Annulla')}
                        </Button>
                        <Button
                            onClick={handleSave}
                            size="small"
                            variant="solid"
                        >
                            {t('Salva')}
                        </Button>
                    </div>
                )}
            </div>
            <div className={styles.dateHours} key={distinctPeriods?.toString()}>
                {distinctPeriods?.map((period, idx) => {
                    if (idx === index) {
                        return (
                            <SpecialTimeInput
                                key={period?.toString() + idx}
                                index={idx}
                                distinctPeriods={distinctPeriods}
                                setDistinctPeriods={setDistinctPeriods}
                                period={period}
                            />
                        )
                    }
                })}
                {/* {distinctPeriods.length === 0 && (
                    <div onClick={addEmptyDate} className={styles.addDate}>
                        <Typography
                            weight={'normal'}
                            size={'bodySmall'}
                            color={'blue'}
                        >
                            {t('+ Aggiungi una data')}
                        </Typography>
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default SpecialHoursList
