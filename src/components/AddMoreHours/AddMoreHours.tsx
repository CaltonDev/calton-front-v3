import {
    ListingMoreHoursProps,
    MoreHoursTypes,
} from '../../pages/ListingEditHours/ListingEditHours.interface'
import AddMoreTag from '../AddMoreTag/AddMoreTag'
import styles from './AddMoreHours.module.scss'
import React, { useEffect, useState } from 'react'

interface AddMoreHoursProps {
    listingItem: ListingMoreHoursProps | null
    onClick: (hoursTypeId: string) => void
}

const AddMoreHours = ({ listingItem, onClick }: AddMoreHoursProps) => {
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
        <>
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
        </>
    )
}

export default AddMoreHours
