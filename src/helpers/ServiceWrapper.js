import HomeService from '../services/HomeService'
import {
    setAverageVotoByTime,
    setAverageVotoIsLoading,
} from '../store/home/averageVotoByTimeSlice'
import {
    setAverageSentimentByTime,
    setAverageSentimentIsLoading,
} from '../store/home/averageSentimentByTime'
import {
    setAverageReviewByTime,
    setAverageReviewIsLoading,
} from '../store/home/averageReviewByTime'
import { showToast } from '../store/toast/errorToastSlice'
import { setSources, setSourcesIsLoading } from '../store/home/sourceSlice'
import FilterService from '../services/FilterService'
import {
    setAllChannelSources,
    setAllLocations,
    setAllProducts,
    setAllSources,
    setAllTopics,
} from '../store/filters/selectableFiltersSlice'
import { setBubbleIsLoading, setBubbles } from '../store/home/bubbleSlice'
import {
    setFeedbackIsLoading,
    setFeedbacks,
    setFeedbacksCount,
    setLoadingCount,
} from '../store/home/feedbackHomeSlice'
import LocationService from '../services/LocationService'
import { setLocationFiltered } from '../store/locations/locationFilteredSlice'
import LoginService from '../services/LoginService'
import { setChildUsers } from '../store/childUsers/childUsersSlice'
import SourcesService from '../services/SourcesService'
import { setSourcesFiltered } from '../store/sources/sourcesFilteredSlice'
import FeedbackService from '../services/FeedbackService'
import { getCodeOnlyCompetitors, getNoCodeFromPlatfrom } from './helpers'
import {
    setDistribuzioniRacc,
    setDistribuzioniRaccIsLoading,
} from '../store/home/distribuzioneRaccomandazioni'
import AnalisiAvanzataService from '../services/AnalisiAvanzataService'
import {
    setAvgRating,
    setAvgSentiment,
    setBestWorst,
    setCountTopic,
    setDistribuzioneSentiment,
    setDistribuzioneTopic,
    setDistribuzioneTopicPerSentiment,
    setReviewsInfos,
    setSentimentChips,
    setTopics,
} from '../store/analisiAvanzataState/analisiAvanzataSlice'
import store from '../store/store'
import ProductsService from '../services/ProductsService'
import TopicService from '../services/TopicService'
import ListingService from '../services/ListingService'
import { setMenusList } from '../store/menus/menuSlice'
import {
    setDistribuzioniVoti,
    setDistribuzioniVotiIsLoading,
} from '../store/home/distribuzioneVotiSlice'

//region home

async function wrapperLoadFilters(allFilters, dispatch, platformType, t) {
    wrapperGetLocationsFiltered(dispatch)
    wrapperGetMenusRedux(dispatch)
    if (platformType !== 'listing') {
        wrapperGetAllTopics(dispatch)
        wrapperGetChannelSourcesFiltered(dispatch, t)
        wrapperGetSourcesFiltered(dispatch, getNoCodeFromPlatfrom(), t)
        wrappeGetLocationService(dispatch, platformType, t)
        wrappeGetProductsService(dispatch, platformType, t)
    }
}

async function wrapperLoadTopics(allFilters, dispatch, code) {
    dispatch(setTopics(null))
    dispatch(setCountTopic(null))
    dispatch(setDistribuzioneTopicPerSentiment(null))
    dispatch(setDistribuzioneTopic(null))
    dispatch(setSentimentChips(null))
    dispatch(setDistribuzioneSentiment(null))
    dispatch(setReviewsInfos(null))
    dispatch(setAvgRating(null))
    dispatch(setAvgSentiment(null))
    dispatch(setDistribuzioneTopicPerSentiment(null))
    dispatch(setBestWorst(null))
    await AnalisiAvanzataService.getTopicFiltered(true, dispatch)
    AnalisiAvanzataService.getDistribuzioneTopic(
        allFilters,
        code,
        dispatch,
        true
    )
    let chipSentimentData = [
        { id: '1', name: 'Negativi', color: '#FF6960', chipFlag: false },
        { id: '2', name: 'Neutri', color: '#FCC207', chipFlag: false },
        { id: '3', name: 'Positivi', color: '#34E0A1', chipFlag: false },
    ]
    dispatch(setSentimentChips(chipSentimentData))
    await Promise.all([
        AnalisiAvanzataService.getDistribuzioneSentiment(
            allFilters,
            code,
            dispatch,
            true
        ),
        AnalisiAvanzataService.getCountTopic(allFilters, code, dispatch),
        AnalisiAvanzataService.getReviewsInfos(allFilters, code, dispatch),
        AnalisiAvanzataService.getAvgRating(allFilters, code, dispatch),
        AnalisiAvanzataService.getAvgSentiment(allFilters, code, dispatch),
        AnalisiAvanzataService.getDistribuzioneTopicPerSentiment(
            allFilters,
            code,
            dispatch,
            true
        ),
        AnalisiAvanzataService.getDistribuzioneTopicPerData(
            allFilters,
            code,
            dispatch,
            true
        ),
        AnalisiAvanzataService.getVotoMedioTopic(
            allFilters,
            code,
            dispatch,
            true
        ),
        AnalisiAvanzataService.getVotoMedioTopicPerData(
            allFilters,
            code,
            dispatch,
            true
        ),
        TopicService.sentTopAndWorst(allFilters, code, dispatch),
    ])
}

async function wrapperReloadHome(
    allFilters,
    columnDateToGroup,
    wordSelected,
    dispatch,
    numCommons,
    compactValues,
    t
) {
    dispatch(setAverageVotoIsLoading(true))
    dispatch(setAverageReviewIsLoading(true))
    dispatch(setAverageSentimentIsLoading(true))
    dispatch(setSourcesIsLoading(true))
    dispatch(setBubbleIsLoading(true))
    dispatch(setDistribuzioniRaccIsLoading(true))
    wrappeWordsCountBUBBLE(allFilters, dispatch, numCommons, t)
    wrapperGetSourcesHome(
        allFilters,
        dispatch,
        getNoCodeFromPlatfrom(),
        true,
        true,
        t
    )
    wrapperGetAverageVotoByTime(allFilters, 'rating', 'Date', dispatch, true, t)
    wrapperGetAverageSentimentByTime(
        allFilters,
        'sentiment',
        undefined,
        dispatch,
        true,
        t
    )
    wrapperGetAverageReviewByTime(allFilters, dispatch, true, t)
    wrapperDistribuzioneRecc(allFilters, 'Date', dispatch, true)
    wrapperGetSourcesFilter(allFilters, dispatch, getNoCodeFromPlatfrom(), t)
    //wrapperDistribuzioneVoti(allFilters, "Date", true, false, t, dispatch)
}

async function wrapperDistribuzioneVoti(
    allFilters,
    columnDateToGroup,
    returnAnt,
    compactValues,
    t,
    dispatch
) {
    try {
        const response = await HomeService.getDistribuzioneVoti(
            allFilters,
            columnDateToGroup,
            undefined,
            returnAnt,
            undefined,
            compactValues
        )
        if (response.data) {
            dispatch(setDistribuzioniVoti(response.data.data))
        }
    } catch (e) {
        dispatch(
            showToast({
                type: 2,
                text: t('Impossibile ottenere distribuzione voti'),
            })
        )
        dispatch(setDistribuzioniVoti([]))
        dispatch(setDistribuzioniVotiIsLoading(false))
    }
}

async function wrapperDistribuzioneRecc(
    allFilters,
    columnDateToGroup,
    dispatch,
    returnAnt
) {
    try {
        const response = await HomeService.getDistributionReccomandation(
            allFilters,
            ['tipo_raccomandazione'],
            columnDateToGroup,
            getNoCodeFromPlatfrom(),
            returnAnt
        )
        if (response.data) {
            dispatch(setDistribuzioniRacc(response.data.data))
        }
    } catch (e) {
        dispatch(setDistribuzioniRacc([]))
        dispatch(setDistribuzioniRaccIsLoading(false))
    }
}

async function wrapperGetAverageVotoByTime(
    allFilters,
    type,
    columnDateToGroup,
    dispatch,
    returnAnt,
    t
) {
    try {
        const response = await HomeService.getAverageByTime(
            allFilters,
            type,
            columnDateToGroup,
            getNoCodeFromPlatfrom(),
            undefined,
            returnAnt,
            undefined
        )
        if (response.data) {
            dispatch(setAverageVotoByTime(response.data.data))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere media voti'),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({ type: 2, text: t('Impossibile ottenere media voti') })
        )
        dispatch(setAverageVotoByTime([]))
        dispatch(setAverageVotoIsLoading(false))
    }
}

async function wrapperGetAverageSentimentByTime(
    allFilters,
    type,
    columnDateToGroup,
    dispatch,
    returnAnt,
    t
) {
    try {
        const response = await HomeService.getAverageByTime(
            allFilters,
            type,
            columnDateToGroup,
            getNoCodeFromPlatfrom(),
            undefined,
            returnAnt,
            undefined
        )
        if (response.data) {
            dispatch(setAverageSentimentByTime(response.data.data))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere media sentiment'),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({
                type: 2,
                text: t('Impossibile ottenere media sentiment'),
            })
        )
        dispatch(setAverageSentimentByTime([]))
        dispatch(setAverageSentimentIsLoading(false))
    }
}

async function wrapperGetAverageReviewByTime(
    allFilters,
    dispatch,
    returnAnt,
    t
) {
    try {
        const response = await HomeService.distribuzioneRecensioniPerData(
            allFilters,
            getNoCodeFromPlatfrom(),
            undefined,
            returnAnt
        )
        if (response.data) {
            dispatch(setAverageReviewByTime(response.data))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere media recensioni'),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({
                type: 2,
                text: t('Impossibile ottenere media recensioni'),
            })
        )
        dispatch(setAverageReviewByTime([]))
        dispatch(setAverageReviewIsLoading(false))
    }
}

async function wrapperGetSourcesHome(
    allFilters,
    dispatch,
    nocode = getNoCodeFromPlatfrom(),
    returnAnt,
    fromHome,
    t
) {
    try {
        const response = await HomeService.getSourcesHome(
            allFilters,
            nocode,
            null,
            null,
            null,
            returnAnt,
            fromHome
        )
        if (response.data) {
            dispatch(setSources(response.data))
        } else {
            dispatch(
                showToast({ type: 2, text: t('Impossibile ottenere fonti') })
            )
        }
    } catch (e) {
        dispatch(showToast({ type: 2, text: t('Impossibile ottenere fonti') }))
        dispatch(setSources([]))
        dispatch(setSourcesIsLoading(false))
    }
}

async function wrapperGetSourcesFilter(
    allFilters,
    dispatch,
    nocode = getNoCodeFromPlatfrom(),
    t
) {
    try {
        const response = await HomeService.getSourcesHome(
            allFilters,
            nocode,
            undefined,
            undefined,
            undefined,
            undefined
        )

        if (response.data) {
            const myArray = response.data.data
            const newArray = []
            for (const obj of myArray) {
                newArray.push(obj)
                if (obj?.children?.length > 0) {
                    const children = obj.children
                    for (const elm of children) {
                        newArray.push(elm)
                    }
                }
            }
        } else {
            dispatch(
                showToast({ type: 2, text: t('Impossibile ottenere fonti') })
            )
        }
    } catch (e) {
        dispatch(showToast({ type: 2, text: t('Impossibile ottenere fonti') }))
        dispatch(setAllSources([]))
        dispatch(setSourcesIsLoading(false))
    }
}

async function wrappeWordsCountBUBBLE(allFilters, dispatch, numCommons, t) {
    try {
        const response = await HomeService.wordsCountBUBBLE(
            allFilters,
            numCommons,
            getNoCodeFromPlatfrom()
        )
        if (response.data) {
            dispatch(setBubbles(response.data.data))
        } else {
            dispatch(
                showToast({ type: 2, text: t('Impossibile ottenere bubbles') })
            )
        }
    } catch (e) {
        dispatch(
            showToast({ type: 2, text: t('Impossibile ottenere bubbles') })
        )
        dispatch(setBubbles([]))
        dispatch(setBubbleIsLoading(false))
    }
}

async function wrapperGetFeedbackSimplifiedHome(
    allFilters,
    wordSelected,
    dispatch
) {
    try {
        const response = await HomeService.getFeedbackSimplifiedHome(
            allFilters,
            wordSelected,
            getNoCodeFromPlatfrom(),
            false,
            true
        )
        if (response.data) {
            dispatch(setFeedbacks(response.data.all_feed))
        } else {
            dispatch(setFeedbacks([]))
        }
    } catch (e) {
        dispatch(setFeedbacks([]))
        dispatch(setFeedbackIsLoading(false))
    }
}

async function wrapperFeedBubble(allFilters, wordSelected, dispatch) {
    dispatch(setFeedbackIsLoading(true))
    dispatch(setLoadingCount(true))
    wrapperGetInfoFeedbackHome(allFilters, wordSelected, dispatch)
    wrapperGetFeedbackSimplifiedHome(allFilters, wordSelected, dispatch)
}

async function wrapperGetInfoFeedbackHome(allFilters, wordSelected, dispatch) {
    try {
        const response = await HomeService.getInfoFeedbackHome(
            allFilters,
            wordSelected,
            getNoCodeFromPlatfrom(),
            true
        )
        if (response.data) {
            dispatch(setFeedbacksCount(response.data.data?.countFeed))
        } else {
            dispatch(setFeedbacksCount(0))
        }
    } catch (e) {
        dispatch(setFeedbacksCount(0))
    }
}

//region filters
async function wrapperGetChannelSourcesFiltered(dispatch, t) {
    try {
        const response = await FilterService.getChannelSourcesFiltered()
        if (response.data) {
            dispatch(setAllChannelSources(response.data.data))
        } else {
            dispatch(
                showToast({ type: 2, text: t('Impossibile ottenere canali') })
            )
        }
    } catch (e) {
        dispatch(showToast({ type: 2, text: t('Impossibile ottenere canali') }))
    }
}

async function wrapperGetLocationsFiltered(dispatch) {
    try {
        const platformType = store.getState()?.Settings.platformType
        const response = await FilterService.getLocationsFiltered(
            platformType === 'surveys'
                ? [0, 1, 2, 3, 4]
                : getNoCodeFromPlatfrom()
        )
        if (response.data) {
            dispatch(setAllLocations(response.data.data))
        } else {
        }
    } catch (e) {}
}

async function wrapperGetAllTopics(dispatch) {
    try {
        const response = await FilterService.getTopicFiltered(true)
        if (response.data) {
            dispatch(setAllTopics(response.data.data))
        } else {
        }
    } catch (e) {}
}

async function wrapperGetMenusRedux(dispatch) {
    try {
        const response = await ListingService.getMenus(
            getNoCodeFromPlatfrom(),
            [],
            undefined,
            0,
            undefined,
            true
        )

        if (response?.data?.data) {
            let tmpList = []

            if (response?.data?.data) {
                tmpList = response?.data?.data
            }

            dispatch(setMenusList(tmpList))
        }
    } catch (e) {
        console.log('Error: ', e)
    }
}
//endregion

//region Settings

async function wrappeGetProductsService(dispatch, platformType, t) {
    try {
        let response
        const code =
            platformType === 'competitor'
                ? getCodeOnlyCompetitors()
                : getNoCodeFromPlatfrom()

        response = await ProductsService.getProductsUnFiltered(code)

        if (response.data) {
            const myArray = response.data.data
            let newArray = []
            myArray.forEach((obj) => {
                newArray.push(obj)
                if (obj?.children?.length > 0) {
                    const children = obj.children
                    children.forEach((elm) => {
                        newArray.push(elm)
                    })
                }
            })
            dispatch(setAllProducts(newArray))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere products filtered'),
                })
            )
            dispatch(setAllProducts([]))
        }
    } catch (e) {}
}

async function wrappeGetLocationService(dispatch, platformType = 'reviews', t) {
    try {
        let response
        const code =
            platformType === 'competitor'
                ? getCodeOnlyCompetitors()
                : getNoCodeFromPlatfrom()

        response = await LocationService.getUserLocations(code)

        if (response.data) {
            dispatch(setLocationFiltered(response.data.data))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere location filtered'),
                })
            )
            dispatch(setLocationFiltered([]))
        }
    } catch (e) {}
}

async function wrappeGetChildUsers(dispatch, t) {
    try {
        const response = await LoginService.getChildUsers()
        if (response.data) {
            dispatch(setChildUsers(response.data.data))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile ottenere utenti figli'),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({ type: 2, text: t('Impossibile ottenere utenti figli') })
        )
    }
}

async function wrappeRegisterSubAccount(dispatch, newUser, t) {
    try {
        const response = await LoginService.registerSubAccount(newUser)
        if (response.data && response.data.code == '200') {
            dispatch(
                showToast({ type: 0, text: t('Utente aggiunto con successo') })
            )
            wrappeGetChildUsers(dispatch, t)
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile completare la registrazione'),
                })
            )
        }
        return response
    } catch (e) {
        if (e.response.data && e.response.data.code === 409) {
            dispatch(showToast({ type: 2, text: t('Email già presente') }))
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile completare la registrazione'),
                })
            )
        }
    }
}

async function wrapperEditChildUser(dispatch, newUser, t) {
    try {
        const response = await LoginService.editChildUser(newUser)
        if (response.data && response.data.code == '200') {
            dispatch(
                showToast({
                    type: 0,
                    text: t('Utente modificato con successo'),
                })
            )
            wrappeGetChildUsers(dispatch, t)
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t('Impossibile completare la modifica'),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({
                type: 2,
                text: t('Impossibile completare la modifica'),
            })
        )
    }
}

async function wrapperDeleteChildUser(dispatch, body, t) {
    try {
        const response = await LoginService.deleteChildUser(body)
        if (response.data && response?.data?.code === '200') {
            dispatch(
                showToast({ type: 0, text: t('Utente eliminato con successo') })
            )
            wrappeGetChildUsers(dispatch, t)
        } else {
            dispatch(
                showToast({
                    type: 2,
                    text: t("Impossibile completare l'eliminazione"),
                })
            )
        }
    } catch (e) {
        dispatch(
            showToast({
                type: 2,
                text: t("Impossibile completare l'eliminazione"),
            })
        )
    }
}

//endregion

async function wrapperGetSourcesFiltered(dispatch, code, t) {
    try {
        const response = await SourcesService.getSourcesFiltered(code)

        dispatch(setSourcesFiltered(response?.data?.data))
        dispatch(setAllSources(response?.data?.data))
    } catch (e) {
        dispatch(
            showToast({ type: 2, text: t('Impossibile ottenere sources') })
        )
    }
}

async function wrapperGetFeedbacks(
    allFilters,
    dispatch,
    simplified,
    skip,
    limit,
    sort,
    search,
    download,
    typeDownload,
    code = getNoCodeFromPlatfrom(),
    t
) {
    try {
        const response = await FeedbackService.getFeedbacks(
            undefined,
            allFilters,
            undefined,
            simplified,
            code,
            skip,
            limit,
            sort,
            search,
            download,
            undefined,
            typeDownload,
            undefined,
            undefined
        )
        if (response.data) {
            return response
        } else {
            dispatch(showToast({ type: 2, text: t('Feedback non presenti') }))
        }
    } catch (e) {
        dispatch(showToast({ type: 2, text: t('Non sono presenti feedback') }))
    }
}

async function wrapperGetInfoFeedbacks(
    allFilters,
    dispatch,
    simplified,
    skip,
    limit,
    sort,
    search,
    download,
    typeDownload,
    code = getNoCodeFromPlatfrom()
) {
    try {
        const response = await FeedbackService.getInfoFeedbacks(
            undefined,
            allFilters,
            undefined,
            simplified,
            code,
            skip,
            limit,
            sort,
            search,
            download,
            undefined,
            typeDownload,
            undefined,
            undefined
        )
        if (response.data) {
            return response
        }
    } catch (e) {
        console.log('E: ', e)
    }
}

const ServiceWrapper = {
    wrapperReloadHome,
    wrapperLoadFilters,
    wrapperDistribuzioneVoti,
    wrapperGetAllTopics,
    wrappeWordsCountBUBBLE,
    wrappeGetLocationService,
    wrappeGetChildUsers,
    wrappeRegisterSubAccount,
    wrapperEditChildUser,
    wrapperDeleteChildUser,
    wrapperGetSourcesFiltered,
    wrapperGetFeedbacks,
    wrapperGetInfoFeedbacks,
    wrapperFeedBubble,
    wrapperLoadTopics,
}

export default ServiceWrapper
