import {
    ListingMoreHoursProps,
    MoreHoursTypes,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import AddMoreTag from '../AddMoreTag/AddMoreTag'
import Typography from '../Typography/Typography'
import styles from './AddMoreHours.module.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AddMoreHoursProps {
    listingItem: ListingMoreHoursProps | null
    onClick: (hoursTypeId: string) => void
}

const AddMoreHours = ({ listingItem, onClick }: AddMoreHoursProps) => {
    const { t } = useTranslation()
    const [moreHoursList, setMoreHoursList] = useState<
        MoreHoursTypes[] | undefined
    >()

    useEffect(() => {
        const results = listingItem?.moreHoursTypes?.filter(
            ({ hoursTypeId: id1 }) =>
                !listingItem?.moreHours?.some(
                    ({ hoursTypeId: id2 }) => id2 === id1
                )
        )
        setMoreHoursList(results)
    }, [listingItem])

    return (
        <div className={styles.specialHoursContainer}>
            <div className={styles.labelContainer}>
                <Typography weight={'bold'} size={'h5'}>
                    {t('Aggiungi altri orari')}
                </Typography>
                <Typography weight={'normal'} size={'bodyMedium'}>
                    {t(
                        "Gli altri orari sono visibili solo se hai già impostato orari standard. In genere, dovresti impostarli come sottoinsieme dell'orario principale."
                    )}
                </Typography>
            </div>
            <div className={styles.tagsContainer}>
                {moreHoursList?.map((type, i) => {
                    return listingItem?.moreHours &&
                        listingItem?.moreHours
                            ?.map((m) => m.hoursTypeId)
                            .includes(type.hoursTypeId) ? (
                        <></>
                    ) : (
                        <div
                            className={styles.addMoreContainer}
                            key={type.hoursTypeId + i}
                        >
                            <AddMoreTag
                                onClick={onClick}
                                nameToBeAdded={type.displayName}
                                hoursTypeId={type.hoursTypeId}
                            />
                        </div>
                    )
                }) || null}
            </div>
        </div>
    )
}

export default AddMoreHours
