import styles from './MoreHours.module.scss'
import React from 'react'
import { Button as ButtonAnt } from 'antd'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { manageLocalToastWSAndReload } from '../../helpers/helpers'
import AddMoreTimeInput from '../AddMoreTimeInput/AddMoreTimeInput'
import { ListingMoreHoursProps } from '../../pages/ListingEditHours/ListingEditHours.interface'

interface MoreHoursProps {
    listing: ListingMoreHoursProps | null
    setListing: React.Dispatch<
        React.SetStateAction<ListingMoreHoursProps | null>
    >
    hoursTypeId: string
    hoursTypeName?: string | undefined
    index: number
    selectedListings: string[]
    refetch: () => void
    handleSave: () => void
    handleCancel: () => void
}

function MoreHours({
    listing,
    setListing,
    hoursTypeId,
    index,
    selectedListings,
    refetch,
    handleSave,
    handleCancel,
}: MoreHoursProps) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = React.useState(false)
    const socketMessage = useSelector((state: any) => state?.Socket?.message)
    const consumeLocallySocket = useSelector(
        (state: any) => state?.Socket?.consumeLocally
    )

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
        <div className={styles.moreHoursContainer}>
            {listing && listing.moreHours && (
                <React.Fragment>
                    <AddMoreTimeInput
                        listing={listing}
                        type="addMore"
                        index={index}
                        hoursTypeId={hoursTypeId}
                        distinctPeriod={listing.moreHours[index]?.periods}
                        setDistinctPeriod={setListing}
                    />
                    <div className={styles.footer}>
                        <div>
                            <Button
                                className={styles.cancelButton}
                                onClick={handleCancel}
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
                </React.Fragment>
            )}
        </div>
    )
}

export default MoreHours
