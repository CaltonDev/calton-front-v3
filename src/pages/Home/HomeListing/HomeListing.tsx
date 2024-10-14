import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import styles from './HomeListing.module.scss'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import LineChart from '../../../components/Charts/LineChart/LineChart'
import ChartConfig from '../../../constants/ChartConfig'
import InfoCardViewer from '../../../components/InfoCardViewer/InfoCardViewer'
import TextContainer from '../../../components/TextContainer/TextContainer'
import HomeService from '../../../services/HomeService'
import Tabs from '../../../components/TabsComponent/Tabs'
import CollapsableCard from '../../../components/CollapsableCard/CollapsableCard'
import DistributionRatingsGraph from '../../../components/Graphs/DistributionRatingsGraph/DistributionRatingsGraph'
import { saveAs } from 'file-saver'
import BubbleChartHome from '../../../components/Charts/BubbleCharts/BubbleChartHome/BubbleChartHome'
import TableSelector from '../../../components/TableSelector/TableSelector'
import FilterService from '../../../services/FilterService'
import TrackerCard from '../../../components/TrackerCard/TrackerCard'
import DonutCard from '../../../components/DonutCard/DonutCard'
import TierListCard from '../../../components/TierListCard/TierListCard'
import Button from '../../../components/Button/Button'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import ReviewCard from '../../../components/Cards/ReviewCard/ReviewCard'
import { PaginationState } from '@tanstack/react-table'
import FeedbackService from '../../../services/FeedbackService'
import SmartResponseService from '../../../services/SmartResponseService'
import _ from 'lodash'
import TopicService from '../../../services/TopicService'
import { showToast } from '../../../store/toast/errorToastSlice'
import ScraperService from '../../../services/ScraperService'
import InfoCard from '../../../components/InfoCard/InfoCard'
import ListingService from '../../../services/ListingService'
import ListingCard from '../../../components/Cards/ListingCard/ListingCard'

function HomeListing() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const search = useSelector((state: RootState) => state.Search.wordSearched)

    const { t } = useTranslation()
    const listingStateFilter = useSelector(
        (state: RootState) => state.Filters.listingLocationState
    )
    const filteredListings = useSelector(
        (state: RootState) => state.Filters.selectedLocationListing
    )

    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    const AiData = [
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            title: 'Lorem ipsum dolor',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
    ]

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            displayLabel: '15%',
            value: 200000,
            total: 15000,
        },
    ]
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })

    const feedbackInfo = FeedbackService.getInfoFeedbacks(
        [],
        allFilters,
        undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        undefined,
        'xlsx',
        undefined,
        undefined,
        null,
        null,
        true,
        undefined
    )?.data?.data

    const feedbacks = FeedbackService.getFeedbacks(
        [],
        allFilters,
        undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        undefined,
        'xlsx',
        undefined,
        undefined,
        null,
        null,
        true,
        undefined
    )?.data?.all_feed

    const smartResponse =
        SmartResponseService.getAllSmartResponses()?.data?.data

    const handleChangeSmartResponse = (ev: any, index: number) => {
        //  console.log(ev)
        const smartSelected = ev
        const foundedFeed = feedbacks[index]
        const indiceToChange = index
        if (smartSelected && smartSelected.srName) {
            if (foundedFeed?.obj?.isReviewer[0]?.data?.name) {
                const nameToAdd = foundedFeed?.obj?.isReviewer[0]?.data?.name
                if (nameToAdd.split(' ').length > 0) {
                    smartSelected.responseText =
                        smartSelected?.responseText?.replace(
                            new RegExp(/{{(.*?)}}/),
                            nameToAdd.split(' ')[0]
                        )
                } else {
                    smartSelected.responseText =
                        smartSelected?.responseText?.replace(
                            new RegExp(/{{(.*?)}}/),
                            nameToAdd
                        )
                }
            }
            foundedFeed.string.isAnswer[0].data['smartSelected'] = smartSelected
        } else {
            foundedFeed.string.isAnswer[0].data['smartSelected'] = undefined
        }
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[indiceToChange] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide
    }

    const handleChangeTopic = async (topics: any, index: number) => {
        const idFeedback = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === '_id'
        )?.data
        let foundedFeed = feedbacks[index]

        const beforeChangeTopic = JSON.parse(JSON.stringify(feedbacks[index]))
        if (_.isEqual(beforeChangeTopic?.list?.isTopic[0]?.data, topics)) {
            return
        }
        if (foundedFeed?.list?.isTopic[0]?.data) {
            foundedFeed.list.isTopic[0].data = topics
        } else {
            foundedFeed.list.isTopic = [{ data: topics }]
        }
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[index] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide
        try {
            await TopicService.handleTopicToFeedback(idFeedback, topics)
            //loadFeedbacks() //setFeedbacks(tmp) //todo: check if necessary with davide
        } catch (e) {
            dispatch(
                showToast({
                    type: 2,
                    text: t(
                        'Impossibile modificare i topic, riprovare più tardi'
                    ),
                })
            )
            foundedFeed = beforeChangeTopic
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[index] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
        }
    }

    const handleClickChangeSentiment = async (
        sentiment: any,
        index: number
    ) => {
        const idFeedback = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === '_id'
        )?.data
        const idSource = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === 'idSource'
        )?.data
        let foundedFeed = feedbacks[index]

        const beforeChangeSentiment = JSON.parse(
            JSON.stringify(feedbacks[index])
        )
        foundedFeed.integer.isSentiment[0].data = sentiment
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[index] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide
        try {
            await FeedbackService.editFeedbackSentiment(
                idFeedback,
                undefined,
                undefined,
                undefined,
                idSource,
                undefined,
                sentiment,
                undefined
            )
            //loadFeedbacks() //todo: check if necessary with davide
        } catch (e) {
            dispatch(
                showToast({
                    type: 2,
                    text: t(
                        'Impossibile modificare il sentiment, riprovare più tardi'
                    ),
                })
            )
            foundedFeed = beforeChangeSentiment
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[index] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
        }
    }

    const handleChangeAnswer = async (
        ev: any,
        index: number,
        toMod: boolean
    ) => {}

    const changePage = (direction: any) => {
        if (direction === 'next') {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            })
        } else if (direction === 'previous') {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            })
        } else {
            const number = Number(direction)
            if (
                number > 0 &&
                number <=
                    Math.ceil(feedbackInfo?.countFeed / pagination.pageSize)
            ) {
                setPagination({
                    pageIndex: number - 1,
                    pageSize: pagination.pageSize,
                })
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                })
            }
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

    const filterListingStateHelper = () => {
        const filteringObj: any = {
            toVerify: null,
            pendingVerification: null,
            isDuplicated: null,
            missedStoreCode: null,
        }

        const verified = listingStateFilter?.verified
        if (verified?.yes && verified?.no) {
            filteringObj.toVerify = null
        } else if (verified?.yes) {
            filteringObj.toVerify = false
        } else if (verified?.no) {
            filteringObj.toVerify = true
        }

        const pendingVerification = listingStateFilter?.pendingVerification

        if (pendingVerification?.yes && pendingVerification?.no) {
            filteringObj.pendingVerification = null
        } else if (pendingVerification?.yes) {
            filteringObj.pendingVerification = true
            filteringObj.toVerify = null
        } else if (pendingVerification?.no) {
            filteringObj.pendingVerification = false
        } else {
            filteringObj.pendingVerification = null
        }

        const isDuplicated = listingStateFilter?.isDuplicated

        if (isDuplicated?.yes && isDuplicated?.no) {
            filteringObj.isDuplicated = null
        } else if (isDuplicated?.yes) {
            filteringObj.isDuplicated = true
        } else if (isDuplicated?.no) {
            filteringObj.isDuplicated = false
        } else {
            filteringObj.isDuplicated = null
        }

        const missedStoreCode = listingStateFilter?.missedStoreCode

        if (missedStoreCode?.yes && missedStoreCode?.no) {
            filteringObj.missedStoreCode = null
        } else if (missedStoreCode?.yes) {
            filteringObj.missedStoreCode = true
        } else if (missedStoreCode?.no) {
            filteringObj.missedStoreCode = false
        } else {
            filteringObj.missedStoreCode = null
        }

        return filteringObj
    }

    const numberOfListings = ListingService.getNumberOfListings(
        allFilters?.selectedLocationListing,
        false,
        filterListingStateHelper()
    )?.data?.count

    const listings = ListingService.getListings(
        pagination.pageSize,
        pagination.pageIndex * pagination.pageSize,
        filteredListings,
        filterListingStateHelper()
    )?.data?.data

    return (
        <PageContainer>
            <PageHeader heading={t('Home')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <InfoCardViewer data={AiData} customWidth={'45%'} />
                    <div className={styles.itemContainer}>
                        <InfoCard
                            value={64}
                            label={t('Totale punti vendita')}
                            icon={'puntiVenditaSvg'}
                            backgroundIconColor={'#E1F6FF'}
                        />
                    </div>
                    <div className={styles.itemContainer}>
                        <TrackerCard data={trackerData} maxHeight={true} />
                    </div>
                </div>
                <div className={styles.navigatorRow}>
                    <div>
                        <PageNavigator
                            totalElements={numberOfListings}
                            currentPage={pagination.pageIndex}
                            pageElements={pagination.pageSize}
                            changeElementsPerPage={changeElementsPerPage}
                            changePage={changePage}
                        />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    {listings?.map((listing: any, idx: number) => {
                        return (
                            <ListingCard
                                key={idx}
                                index={idx}
                                listing={listing}
                            />
                        )
                    })}
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeListing
