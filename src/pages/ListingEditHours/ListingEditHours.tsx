import styles from './ListingEditHours.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import CardSelection from '../../components/CardSelection/CardSelection'
import StandardHours from '../../components/StandardHours/StandardHours'
import HolidayTime from '../../components/HolidayTime/HolidayTime'
import AddMoreTimes from '../../components/AddMoreTimes/AddMoreTimes'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ListingService from '../../services/ListingService'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import { ListingProps } from './ListingEditHours.interface'

function ListingEditHours() {
    const { t } = useTranslation()
    const location = useLocation()
    const selectedListings = location?.state?.item
        ? [location?.state?.item]
        : []
    const { data: hours, refetch } = ListingService.getHours({
        listingsName: selectedListings,
        returnAnt: true,
        code: getNoCodeFromPlatfrom(),
    })
    const [listingHours, setListingHours] = React.useState<ListingProps | null>(
        null
    )
    const [selectedCard, setSelectedCard] = React.useState(0)

    const data = [
        {
            title: t('Orario standard'),
            description: t(
                "Imposta l'orario di apertura principale o contrassegna la tua attività come chiusa."
            ),
        },
        {
            title: t('Orario festivo') + ' >',
            description: t(
                "Conferma l'orario per i giorni di festa per indicare ai tuoi clienti le aperture della tua attività."
            ),
        },
        {
            title: t('Aggiungi altri orari') + ' >',
            description: t(
                "Gli altri orari sono visibili solo se hai già impostato orari standard. In genere, dovresti impostarli come sottoinsieme dell'orario principale."
            ),
        },
    ]

    React.useEffect(() => {
        if (hours?.data && hours?.data?.length > 0) {
            setListingHours(hours?.data[0])
        }
    }, [hours])

    return (
        <>
            <PageContainer>
                <PageHeader heading={t('Edit Hours')}></PageHeader>
                <div className={styles.container}>
                    <div className={styles.body}>
                        <div className={styles.leftContainer}>
                            <CardSelection
                                data={data}
                                title={t('Edit Hours')}
                                activeCard={selectedCard}
                                setSelectedCard={setSelectedCard}
                                addNewCard={false}
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
                            {selectedCard === 1 && <HolidayTime />}
                            {selectedCard === 2 && <AddMoreTimes />}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    )
}

export default ListingEditHours
