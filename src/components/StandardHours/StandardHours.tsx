import styles from './StandardHours.module.scss'
import React from 'react'
import Checkbox from '../Checkbox/Checkbox'
import { useTranslation } from 'react-i18next'
import { StandardTimeInput } from '../StandardTimeInput/StandardTimeInput'
import Typography from '../Typography/Typography'
import { ListingProps } from '../../pages/ListingEditHours/ListingEditHours.interface'
import { useDispatch, useSelector } from 'react-redux'
import { manageLocalToastWSAndReload } from '../../helpers/helpers'
import useEditHours from '../../utils/hooks/useEditHours'
import Button from '../Button/Button'
import { regularHoursBooleans } from '../../constants/CustomConstants'

interface StandardHoursProps {
    listing: ListingProps | null
    setListing: React.Dispatch<React.SetStateAction<ListingProps | null>>
    refetch?: () => void
    selectedListings?: any[]
}

function StandardHours({
    listing,
    setListing,
    selectedListings,
    refetch,
}: StandardHoursProps) {
    const { t } = useTranslation()
    const mutation = useEditHours()
    const [value, setValue] = React.useState(openStatus(listing?.openInfo))
    const [isLocationOpen, setIsLocationOpen] = React.useState(true)
    const dispatch = useDispatch()
    const socketMessage = useSelector((state: any) => state?.Socket?.message)
    const consumeLocallySocket = useSelector(
        (state: any) => state?.Socket?.consumeLocally
    )

    const onChange = (value: string) => {
        setValue(value)
        setIsLocationOpen(+value < 3)
    }

    function openStatus(status: string | undefined) {
        switch (status) {
            case 'OPEN':
                return '1'
            case 'OPEN_FOR_BUSINESS_UNSPECIFIED':
                return '2'
            case 'CLOSED_TEMPORARILY':
                return '3'
            case 'CLOSED_PERMANENTLY':
                return '4'
            default:
                return '1'
        }
    }

    function isValidValue(value: string, validValue: string) {
        return value === validValue
    }

    const handleSave = () => {
        const hours = {
            SUNDAY: listing?.SUNDAY,
            MONDAY: listing?.MONDAY,
            TUESDAY: listing?.TUESDAY,
            WEDNESDAY: listing?.WEDNESDAY,
            THURSDAY: listing?.THURSDAY,
            FRIDAY: listing?.FRIDAY,
            SATURDAY: listing?.SATURDAY,
        }

        mutation.mutate({
            hours: hours,
            listingsName: selectedListings,
            isRegular: true,
            isSpecial: false,
            isMore: false,
            isNotSpecified: isValidValue(
                value,
                regularHoursBooleans['OPEN_FOR_BUSINESS_UNSPECIFIED']
            ),
            isTemporarilyClosed: isValidValue(
                value,
                regularHoursBooleans['CLOSED_TEMPORARILY']
            ),
            isPermanentlyClosed: isValidValue(
                value,
                regularHoursBooleans['CLOSED_PERMANENTLY']
            ),
            toOverwrite: true,
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
        <div className={styles.standardHoursContainer}>
            <div className={styles.labelContainer}>
                <Typography weight={'bold'} size={'h5'}>
                    {t('Standard time')}
                </Typography>
                <Typography weight={'normal'} size={'bodyMedium'}>
                    {t(
                        'Set key opening hours or mark your business as closed.'
                    )}
                </Typography>
            </div>

            <div className={styles.customRow}>
                <div className={styles.customCol}>
                    <Checkbox
                        checked={value === '1'}
                        onClick={() => onChange('1')}
                        title={t('Aperta (orario standard specificato)')}
                        subtitle={t(
                            'Mostra gli orari di apertura della tua attività'
                        )}
                    />
                </div>
                <div className={styles.customCol}>
                    <Checkbox
                        checked={value === '2'}
                        onClick={() => onChange('2')}
                        title={t('Aperta (orario standard non specificato)')}
                        subtitle={t('Non mostrare gli orari di apertura')}
                    />
                </div>
                <div className={styles.customCol}>
                    <Checkbox
                        checked={value === '3'}
                        onClick={() => onChange('3')}
                        title={t('Chiusa temporaneamente')}
                        subtitle={t(
                            'Indica che la tua attività riaprirà in futuro'
                        )}
                    />
                </div>
                <div className={styles.customCol}>
                    <Checkbox
                        checked={value === '4'}
                        onClick={() => onChange('4')}
                        title={t('Chiusa definitivamente')}
                        subtitle={t(
                            'Indica che la tua attività non esiste più'
                        )}
                    />
                </div>
            </div>
            {isLocationOpen && (
                <StandardTimeInput listing={listing} setListing={setListing} />
            )}
            <div className={styles.footer}>
                <div>
                    <Button className={styles.cancelButton}>
                        {t('Annulla')}
                    </Button>
                </div>
                <div>
                    <Button onClick={handleSave} className={styles.saveButton}>
                        {t('Salva')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StandardHours
