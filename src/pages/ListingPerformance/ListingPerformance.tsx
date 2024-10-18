import styles from './ListingPerformance.module.scss'
import SmallGraphHome from '../../components/Graphs/SmallGraphHome/SmallGraphHome'
import { useSelector } from 'react-redux'
import React from 'react'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import { useTranslation } from 'react-i18next'
import HeadingChart from '../../components/Charts/HeadingChart/HeadingChart'
import SmallTableGraphHome from '../../components/Graphs/SmallTableGraphHome/SmallTableGraphHome'
import ListingService from '../../services/ListingService'
import PieChart from '../../components/Charts/PieChart/PieChart'
import ChartConfig from '../../constants/ChartConfig'
import AnalisiInfoCardListing from '../../components/Charts/AnalisiInfoCardListing/AnalisiInfoCardListing'
import {
    businessFoodMenuClicks,
    businessFoodOrders,
    businessBookingsConst,
    businessConversations,
    businessDirectionConst,
    businessImpressionsDesktopMaps,
    businessImpressionsDesktopSearch,
    businessImpressionsMobileMaps,
    businessImpressionsMobileSearch,
    callClicksConst,
    keywords,
    websiteClicksConst,
} from '../../constants/StringConstant'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import { RootState } from '../../store/store'

function ListingPerformance() {
    const platformCode = useSelector(
        (state: RootState) => state.Code.platformCode
    )
    const { t } = useTranslation()
    const { selectedLocationDetails } = useSelector(selectAllFilters)
    const allFilters = useSelector(selectAllFilters)
    const filteredListings =
        selectedLocationDetails?.map(
            (item: any) => item?.account?.name + '/' + item?.name
        ) ?? null

    const colors = [
        {
            type: 'googleMapsDesktop',
            color: '#34E0A1',
        },
        {
            type: 'googleMapsMobile',
            color: '#FCC207',
        },
        {
            type: 'googleSearchDesktop',
            color: '#3F49FC',
        },
        {
            type: 'googleSearchMobile',
            color: '#FF608B',
        },
    ]

    const callClicksData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [callClicksConst],
        platformCode
    )?.data

    const websiteClicksData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [websiteClicksConst],
        platformCode
    )?.data

    const businessBookingsData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessBookingsConst],
        platformCode
    )?.data

    const businessDirectionData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessDirectionConst],
        platformCode
    )?.data

    const businessFoodOrdersData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessFoodOrders],
        platformCode
    )?.data

    const businessFoodMenuClicksData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessFoodMenuClicks],
        platformCode
    )?.data

    const businessConversationsData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessConversations],
        platformCode
    )?.data

    const overviewConstData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [
            callClicksConst,
            websiteClicksConst,
            businessBookingsConst,
            businessDirectionConst,
            businessConversations,
            businessFoodMenuClicks,
        ],
        platformCode
    )?.data

    const keywordsData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [keywords],
        platformCode
    )?.data

    const businessImpressionsDesktopSearchData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessImpressionsDesktopSearch],
        platformCode
    )?.data

    const businessImpressionsMobileSearchData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessImpressionsMobileSearch],
        platformCode
    )?.data

    const businessImpressionsDesktopMapsData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessImpressionsDesktopMaps],
        platformCode
    )?.data

    const businessImpressionsMobileMapsData = ListingService.getPerformance(
        allFilters,
        filteredListings,
        [businessImpressionsMobileMaps],
        platformCode
    )?.data

    const doughnutData = [
        {
            type: 'googleMapsDesktop',
            value: businessImpressionsDesktopMapsData?.tot,
        },
        {
            type: 'googleMapsMobile',
            value: businessImpressionsMobileMapsData?.tot,
        },
        {
            type: 'googleSearchDesktop',
            value: businessImpressionsDesktopSearchData?.tot,
        },
        {
            type: 'googleSearchMobile',
            value: businessImpressionsMobileSearchData?.tot,
        },
    ]
    const searchTotal =
        businessImpressionsDesktopSearchData?.tot +
        businessImpressionsMobileSearchData?.tot +
        businessImpressionsDesktopMapsData?.tot +
        businessImpressionsMobileMapsData?.tot

    return (
        <PageContainer>
            <PageHeader heading={t('Performance')} />
            <div className={styles.rowHome}>
                <SmallGraphHome
                    dataReady={overviewConstData}
                    title={t('Panoramica')}
                    color={ChartConfig.color.red}
                    numberToShow={overviewConstData?.tot}
                    label={t('Panoramica')}
                    styleCounter={styles.countUpOverview}
                    chartdata={overviewConstData?.data}
                    isRound={true}
                    isInfoTooltip={true}
                    infoTooltip={t(
                        'Che cosa sono le interazioni?\nLe interazioni avvengono quando le persone chiamano, inviano messaggi, effettuano prenotazioni, chiedono indicazioni stradali e altro ancora dal profilo della tua attività su Google.'
                    )}
                />
                <SmallGraphHome
                    dataReady={callClicksData}
                    color={ChartConfig.color.primary}
                    title={t('Chiamate')}
                    styleCounter={styles.countUpReviews}
                    numberToShow={callClicksData?.tot}
                    isRound={true}
                    label={t('Chiamate')}
                    chartdata={callClicksData?.data}
                    isInfoTooltip={true}
                    infoTooltip={t('Chiamate')}
                />
                <SmallGraphHome
                    dataReady={businessDirectionData}
                    color={ChartConfig.color.green}
                    title={t('Indicazioni')}
                    numberToShow={businessDirectionData?.tot}
                    label={t('Indicazioni')}
                    styleCounter={styles.countUpDirections}
                    chartdata={businessDirectionData?.data}
                    isRound={true}
                    isInfoTooltip={true}
                    infoTooltip={t('Indicazioni')}
                />
            </div>
            <div className={styles.lastRowHome}>
                <div className={styles.distribuzioneTopic}>
                    <div>
                        <div
                            className={styles.subSection}
                            style={{ padding: 0 }}
                        >
                            <div className={styles.pieSection}>
                                <HeadingChart
                                    width={'90%'}
                                    title={t('Distribuzione ricerche')}
                                    isAnt={true}
                                    download={true}
                                    isInfoTooltip={true}
                                    infoTooltip={t(
                                        'Che cosa sono le visualizzazioni e le ricerche?\nLe visualizzazioni indicano il numero di utenti che hanno visto il profilo della tua attività su Ricerca Google o Maps. Le ricerche mostrano i termini utilizzati dagli utenti che hanno determinato la visualizzazione del tuo profilo nei risultati.'
                                    )}
                                    //dataReady={performanceState[doughnutConst]}
                                />
                                <div className={styles.subSectionWidth}>
                                    <PieChart
                                        height={'320px'}
                                        title={t('Distribuzione ricerche')}
                                        data={doughnutData}
                                        colors={colors}
                                    />
                                </div>
                            </div>

                            <div
                                style={{
                                    paddingTop: '25px',
                                    paddingRight: '25px',
                                    width: '45%',
                                }}
                            >
                                <AnalisiInfoCardListing
                                    dataReady={
                                        businessImpressionsDesktopSearchData
                                    }
                                    label={t(
                                        `Ricerca Google – Computer desktop`
                                    )}
                                    value={
                                        businessImpressionsDesktopSearchData?.tot
                                    }
                                    percentageValue={(
                                        (businessImpressionsDesktopSearchData?.tot *
                                            100) /
                                        searchTotal
                                    ).toFixed(2)}
                                    color={colors[2]?.color}
                                />
                                <AnalisiInfoCardListing
                                    dataReady={
                                        businessImpressionsMobileSearchData
                                    }
                                    label={t(
                                        `Ricerca Google – Dispositivi mobili`
                                    )}
                                    value={
                                        businessImpressionsMobileSearchData?.tot
                                    }
                                    percentageValue={(
                                        (businessImpressionsMobileSearchData?.tot *
                                            100) /
                                        searchTotal
                                    ).toFixed(2)}
                                    color={colors[3]?.color}
                                />
                                <AnalisiInfoCardListing
                                    dataReady={
                                        businessImpressionsMobileMapsData
                                    }
                                    label={t(
                                        `Google Maps – Dispositivi mobili`
                                    )}
                                    value={
                                        businessImpressionsMobileMapsData?.tot
                                    }
                                    percentageValue={(
                                        (businessImpressionsMobileMapsData?.tot *
                                            100) /
                                        searchTotal
                                    ).toFixed(2)}
                                    color={colors[1]?.color}
                                />
                                <AnalisiInfoCardListing
                                    dataReady={
                                        businessImpressionsDesktopMapsData
                                    }
                                    label={t(`Google Maps – Computer desktop`)}
                                    value={
                                        businessImpressionsDesktopMapsData?.tot
                                    }
                                    percentageValue={(
                                        (businessImpressionsDesktopMapsData?.tot *
                                            100) /
                                        searchTotal
                                    ).toFixed(2)}
                                    color={colors[0]?.color}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.verticalSection}>
                    <SmallGraphHome
                        dataReady={businessConversationsData}
                        color={ChartConfig.color.lightBlue}
                        title={t('Messaggi')}
                        styleCounter={styles.countUpMessages}
                        numberToShow={businessConversationsData?.tot}
                        label={t('Messaggi')}
                        chartdata={businessConversationsData?.data}
                        isTwoCols={true}
                        fullWidth={true}
                        mediaQuery={true}
                        isRound={true}
                        isInfoTooltip={true}
                        infoTooltip={t('Messaggi')}
                    />
                    <SmallGraphHome
                        dataReady={websiteClicksData}
                        color={ChartConfig.color.purple}
                        title={t('Click sul sito web')}
                        numberToShow={websiteClicksData?.tot}
                        label={t('Click sul sito web')}
                        styleCounter={styles.countUpClicks}
                        chartdata={websiteClicksData?.data}
                        isTwoCols={true}
                        fullWidth={true}
                        mediaQuery={true}
                        isRound={true}
                        isInfoTooltip={true}
                        infoTooltip={t('Click sul sito web')}
                    />
                </div>
            </div>
            <div className={styles.lastRowHome}>
                <SmallTableGraphHome
                    dataReady={keywordsData}
                    color={ChartConfig.color.violet}
                    title={t('Dettagli delle ricerche')}
                    styleCounter={styles.countUpReviews}
                    isRound={true}
                    label={t('Dettagli delle ricerche')}
                    data={keywordsData?.data}
                    totalNumber={keywordsData?.tot}
                    isTwoCols={true}
                    isImportant={true}
                    mediaQuery={true}
                    isInfoTooltip={true}
                    infoTooltip={t('Dettagli delle ricerche')}
                />
                <SmallGraphHome
                    dataReady={businessBookingsData}
                    title={t('Prenotazioni')}
                    numberToShow={businessBookingsData?.tot}
                    label={t('Prenotazioni')}
                    styleCounter={styles.countUpRatings}
                    chartdata={businessBookingsData?.data}
                    isRound={true}
                    isInfoTooltip={true}
                    infoTooltip={t('Prenotazioni')}
                />
            </div>
            <div className={styles.lastRowHome}>
                <SmallGraphHome
                    dataReady={businessFoodOrdersData}
                    color={ChartConfig.color.magenta}
                    title={t('Ordini cibo')}
                    styleCounter={styles.foodOrders}
                    numberToShow={businessFoodOrdersData?.tot}
                    isRound={true}
                    label={t('Ordini cibo')}
                    chartdata={businessFoodOrdersData?.data}
                    isTwoCols={true}
                    isInfoTooltip={true}
                    infoTooltip={t('Ordini cibo')}
                />
                <SmallGraphHome
                    dataReady={businessFoodMenuClicksData}
                    color={ChartConfig.color.realYellow}
                    title={t('Click sul menu')}
                    numberToShow={businessFoodMenuClicksData?.tot}
                    label={t('Click sul menu')}
                    styleCounter={styles.foodMenuClicks}
                    chartdata={businessFoodMenuClicksData?.data}
                    isTwoCols={true}
                    isRound={true}
                    isInfoTooltip={true}
                    infoTooltip={t(
                        "Che cosa sono i contenuti del menu?\nI contenuti del menu includono informazioni dettagliate sui piatti, foto del menu e link al menu nel tuo profilo dell'attività"
                    )}
                />
            </div>
        </PageContainer>
    )
}

export default ListingPerformance
