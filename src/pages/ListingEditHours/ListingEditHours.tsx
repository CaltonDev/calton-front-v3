import styles from './ListingEditHours.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import StandardHours from '../../components/StandardHours/StandardHours'
import SpecialHours from '../../components/SpecialHours/SpecialHours'
import { useLocation } from 'react-router-dom'
import ListingService from '../../services/ListingService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import {
    ListingMoreHoursProps,
    ListingProps,
    ListingSpecialHoursProps,
    IMoreHours,
} from './ListingEditHours.interface'
import MoreHours from '../../components/MoreHours/MoreHours'
import AddMoreHours from '../../components/AddMoreHours/AddMoreHours'
import { isUndefined } from 'lodash'
import { useQueryClient } from 'react-query'
import useEditHours from '../../utils/hooks/useEditHours'
import { DataType } from '../../components/CardSelection/CardSelection.interface'

function ListingEditHours() {
    const { t } = useTranslation()
    const location = useLocation()
    const queryClient = useQueryClient()
    const mutation = useEditHours()
    const selectedListings = location?.state?.item
        ? [location?.state?.item]
        : []
    const { data: hours, refetch } = ListingService.getHours({
        listingsName: selectedListings,
        returnAnt: true,
        code: getNoCodeFromPlatfrom(),
    })
    const { data: specialHours, refetch: refetchSpecialHours } =
        ListingService.getSpecialHours({
            listingsName: selectedListings,
            isSingle: true,
            code: getNoCodeFromPlatfrom(),
        })
    const { data: moreHours, refetch: refetchMoreHours } =
        ListingService.getMoreHours({
            listingsName: selectedListings,
            code: getNoCodeFromPlatfrom(),
            isSingle: true,
        })
    const [listingHours, setListingHours] = React.useState<ListingProps | null>(
        null
    )
    const [listingSpecialHours, setListingSpecialHours] =
        React.useState<ListingSpecialHoursProps | null>(null)
    const [listingMoreHours, setListingMoreHours] =
        React.useState<ListingMoreHoursProps | null>(null)
    const [selectedCard, setSelectedCard] = React.useState(0)
    const [subCardMoreHours, setSubCardMoreHours] = React.useState()
    const cardRef = React.useRef<HTMLDivElement>(null)
    const subCardRef = React.useRef<HTMLDivElement>(null)

    const data: DataType[] = [
        {
            title: t('Orario standard'),
            description: t(
                "Imposta l'orario di apertura principale o contrassegna la tua attività come chiusa."
            ),
            wrappedKey: 'standardHours',
        },
        {
            title: t('Orario festivo'),
            description: t(
                "Conferma l'orario per i giorni di festa per indicare ai tuoi clienti le aperture della tua attività."
            ),
            wrappedKey: 'specialHours',
        },
        {
            title: t('Aggiungi altri orari'),
            description: t(
                "Gli altri orari sono visibili solo se hai già impostato orari standard. In genere, dovresti impostarli come sottoinsieme dell'orario principale."
            ),
            wrappedKey: 'moreHours',
        },
    ]

    const addMoreOnClick = (hourId: string) => {
        const tmp = listingMoreHours
        let elem: IMoreHours[] = []

        const newHoursType = {
            hoursTypeId: hourId,
            displayName: hourId.charAt(0) + hourId.substring(1).toLowerCase(),
            periods: [],
        }

        if (tmp && tmp['moreHours'] !== null) {
            elem = tmp['moreHours']
        }

        elem.push(newHoursType)
        if (tmp) tmp['moreHours'] = elem
        setListingMoreHours(JSON.parse(JSON.stringify(tmp)))
    }

    const handleDeleteSubCard = (index: number) => {
        const nextListingMoreHours = {
            moreHours:
                listingMoreHours?.moreHours?.filter((item, i) => i !== index) ||
                null,
            formatted_address: listingMoreHours?.formatted_address || '',
            title: listingMoreHours?.title || '',
            moreHoursTypes: listingMoreHours?.moreHoursTypes || null,
        }
        queryClient.removeQueries('moreHours')
        handleSaveMoreHours(nextListingMoreHours)

        setSelectedCard(2)
        setSubCardMoreHours(undefined)
        refetchMoreHours()
    }

    const handleSaveMoreHours = (
        optionalData: ListingMoreHoursProps | null = null
    ) => {
        const nextMoreHours = optionalData
            ? { ...optionalData }
            : {
                  ...listingMoreHours,
              }
        console.log('save more hours')
        mutation.mutate({
            // hours: nextMoreHours,
            hours: { ...listingMoreHours },
            listingsName: selectedListings,
            isMore: true,
            isNotSpecified: false,
            isPermanentlyClosed: false,
            isRegular: false,
            isSpecial: false,
            isTemporarilyClosed: false,
            toOverwrite: true,
            queryStr: 'moreHours',
        })
    }

    const handleCancelMoreHours = () => {
        setListingMoreHours(null)
        queryClient.removeQueries('moreHours')
        setSubCardMoreHours(undefined)
        setSelectedCard(2)
        refetchMoreHours()
    }
    React.useEffect(() => {
        if (hours?.data && hours?.data?.length > 0) {
            setListingHours(hours?.data[0])
        }
    }, [hours])

    React.useEffect(() => {
        if (specialHours?.data) {
            setListingSpecialHours(specialHours.data)
        }
    }, [specialHours])
    React.useEffect(() => {
        if (moreHours?.data) {
            setListingMoreHours(moreHours.data)
        }
    }, [moreHours, refetchMoreHours])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                subCardRef.current &&
                !subCardRef.current.contains(event.target as Node) &&
                cardRef.current &&
                cardRef.current.contains(event.target as Node)
            )
                setSubCardMoreHours(undefined)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [cardRef, subCardRef])

    React.useEffect(() => {
        console.log('listingSpecialHours', listingSpecialHours)
    }, [listingSpecialHours])

    return (
        <>
            <PageContainer>
                <PageHeader heading={t('Edit Hours')}></PageHeader>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <div
                            className={styles.leftContainer}
                            ref={cardRef}
                            key={
                                listingMoreHours?.moreHours?.length
                                    ? selectedCard +
                                      listingMoreHours?.moreHours?.length
                                    : selectedCard
                            }
                        >
                            <CardSelection
                                data={data}
                                title={t('Edit Hours')}
                                activeCard={selectedCard}
                                setSelectedCard={setSelectedCard}
                                addNewCard={false}
                                hasWrappedComponent={true}
                                wrappedComponent={
                                    <div ref={subCardRef}>
                                        <CardSelection
                                            data={
                                                listingMoreHours?.moreHours?.map(
                                                    (m) => {
                                                        const displayName =
                                                            listingMoreHours?.moreHoursTypes?.find(
                                                                (itemType) =>
                                                                    itemType?.hoursTypeId ===
                                                                    m?.hoursTypeId
                                                            )?.displayName
                                                        return {
                                                            title: `${t('Orario di')} ${displayName}`,
                                                        }
                                                    }
                                                ) || []
                                            }
                                            title={t('')}
                                            addNewCard={false}
                                            activeCard={subCardMoreHours}
                                            setSelectedCard={
                                                setSubCardMoreHours
                                            }
                                            isDeleteButton={true}
                                            handleDelete={handleDeleteSubCard}
                                        />
                                    </div>
                                }
                            />
                        </div>
                        <div className={styles.rigthContainer}>
                            {selectedCard === 0 && (
                                <StandardHours
                                    listing={listingHours}
                                    setListing={setListingHours}
                                    selectedListings={selectedListings}
                                    refetch={refetch}
                                />
                            )}
                            {selectedCard === 1 && (
                                <SpecialHours
                                    listing={listingSpecialHours}
                                    refetch={refetchSpecialHours}
                                    selectedListings={selectedListings}
                                    toOverwrite={true}
                                />
                            )}
                            {selectedCard === 2 &&
                                !isUndefined(subCardMoreHours) &&
                                listingMoreHours?.moreHours &&
                                listingMoreHours.moreHours &&
                                listingMoreHours.moreHours[subCardMoreHours] &&
                                listingMoreHours.moreHours[subCardMoreHours]
                                    .hoursTypeId && (
                                    <div
                                        className={styles.hoursOptionContainer}
                                        key={subCardMoreHours}
                                    >
                                        <MoreHours
                                            hoursTypeId={
                                                listingMoreHours?.moreHours[
                                                    subCardMoreHours
                                                ]?.hoursTypeId
                                            }
                                            hoursTypeName={
                                                listingMoreHours?.moreHoursTypes?.find(
                                                    (item) =>
                                                        item.hoursTypeId ===
                                                        listingMoreHours
                                                            ?.moreHours?.[
                                                            subCardMoreHours
                                                        ]?.hoursTypeId
                                                )?.displayName
                                            }
                                            index={subCardMoreHours}
                                            listing={listingMoreHours}
                                            setListing={setListingMoreHours}
                                            selectedListings={selectedListings}
                                            refetch={refetchMoreHours}
                                            handleSave={handleSaveMoreHours}
                                            handleCancel={handleCancelMoreHours}
                                        />
                                    </div>
                                )}
                            {selectedCard === 2 &&
                                isUndefined(subCardMoreHours) && (
                                    <div
                                        className={styles.hoursOptionContainer}
                                        key={subCardMoreHours}
                                    >
                                        <AddMoreHours
                                            onClick={addMoreOnClick}
                                            listingItem={listingMoreHours}
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    )
}

export default ListingEditHours
