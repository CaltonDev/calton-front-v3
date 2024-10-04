import apiService from './api/apiService'
import { generateRandomColor, getNoCodeFromPlatfrom } from '../helpers/helpers'
import { getHeaders } from './api/headers'
import { useQuery } from 'react-query'

interface AllFilters {
    startDate: string
    endDate: string
    selectedLocation: string[]
    selectedChannel: string[]
    selectedTopics: string[]
    selectedProducts: string[]
    selectedSource: string[]
    groupby: string
    customFilters: any // Adjust type as per your application's customFilters type
}

function getTopicFiltered(
    includeNotAnalysed: boolean,
    dispatch: any
): Promise<any> {
    const body = {
        includeNotAnalysed,
    }
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post('/topic/getTopicFiltered', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    data.forEach((element: any, index: number) => {
                        element.chipFlag = false
                        if (!element.color) {
                            element.color = generateRandomColor()
                        }
                    })
                    //dispatch(setTopics(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getDistribuzioneTopic(
    allFilters: AllFilters,
    code = getNoCodeFromPlatfrom()
    //dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
    }

    return new Promise((resolve, reject) => {
        apiService.apiAnalAdvTopic
            .post('/distribuzioneTopic', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setDistribuzioneTopic(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getDistribuzioneSentiment(
    allFilters: AllFilters,
    code = getNoCodeFromPlatfrom(),
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiAnalysisGeneric
            .post('/analisiGenerica/distribuzioneSentiment', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setDistribuzioneSentiment(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getDistribuzioneTopicPerSentiment(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiAnalAdvTopic
            .post('/distribuzioneTopicPerSentiment', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setDistribuzioneTopicPerSentiment(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getDistribuzioneTopicPerData(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        //dispatch(setDistribuzioneTopicPerData(null))
        apiService.apiAnalAdvTopic
            .post('/distribuzioneTopicPerData', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setDistribuzioneTopicPerData(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getVotoMedioTopicPerData(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        //dispatch(setVotoMedioTopicPerData(null))
        apiService.apiAnalAdvTopic
            .post('/votoMedioTopicPerData', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setVotoMedioTopicPerData(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getVotoMedioTopic(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        //dispatch(setVotoMedioTopic(null))
        apiService.apiAnalAdvTopic
            .post('/votoMedioTopic', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data.data
                    //dispatch(setVotoMedioTopic(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getCountTopic(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('/countTopic', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data
                    //dispatch(setCountTopic(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getReviewsInfos(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post('/reviews/infos', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data
                    //dispatch(setReviewsInfos(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getAvgRating(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('/avgRating', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data
                    //dispatch(setAvgRating(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function getAvgSentiment(
    allFilters: AllFilters,
    code: string,
    dispatch: any
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
    }

    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('/avgSentiment', body, getHeaders())
            .then((res) => {
                if (res.data && res.data.data) {
                    const data = res.data
                    //dispatch(setAvgSentiment(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })
}

function npsTempo(
    allFilters: AllFilters,
    columns: any[] = [],
    returnAnt = false,
    colX = 'isNPS',
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        colX: colX,
        columns: columns,
        returnAnt: returnAnt,
    }
    return useQuery<any, Error>(
        ['npsTempo', allFilters.toString(), idSources],
        () =>
            apiService.apiAnalysisGeneric.post(
                'analisiGenerica/npsTempo',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getDistVotiPerData(
    allFilters: AllFilters,
    columns: any[] = [],
    returnAnt = false,
    colX: string | undefined = undefined,
    colY = 'isDataFeedback',
    isMultiChoice = false,
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        // colX: colX,
        colY: colY,
        columns: columns,
        returnAnt: returnAnt,
        isMultiChoice: isMultiChoice,
    }
    return useQuery<any, Error>(
        ['getDistVotiPerData', allFilters, idSources],
        () =>
            apiService.apiAnalysisStandard.post(
                'analisiGenerica/distValByDate',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function distTopicPerData(
    allFilters: AllFilters,
    columns: any[] | undefined = undefined,
    returnAnt = false,
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
        customFilters,
        selectedProducts,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        columns: columns,
        returnAnt: returnAnt,
        idProducts: selectedProducts,
    }

    return useQuery<any, Error>(
        ['distribuzioneTopicPerData', allFilters.toString(), idSources],
        () =>
            apiService.apiAnalAdvTopic.post(
                'distribuzioneTopicPerData',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getDistribuzioneNps(
    allFilters: AllFilters,
    columns: any[] = [],
    returnAnt = false,
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        columns: columns,
        returnAnt: returnAnt,
    }

    return useQuery<any, Error>(
        ['getDistribuzioneNps', allFilters.toString(), idSources],
        () =>
            apiService.apiAnalysisGeneric.post(
                'analisiGenerica/distribuzioneNps',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getDistTopicSentiment(
    allFilters: AllFilters,
    columns: any[] = [],
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
        customFilters,
        selectedProducts,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        columns: columns,
        idProducts: selectedProducts,
    }

    return useQuery<any, Error>(
        ['distribuzioneTopicPerSentiment', allFilters.toString(), idSources],
        () =>
            apiService.apiAnalAdvTopic.post(
                'distribuzioneTopicPerSentiment',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getDistSentiment(
    allFilters: AllFilters,
    columns: any[] = [],
    returnAnt = true,
    idSources: string[]
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        code: getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt,
    }

    return useQuery<any, Error>(
        ['distribuzioneSentiment', allFilters.toString(), idSources],
        () =>
            apiService.apiAnalysisGeneric.post(
                'analisiGenerica/distribuzioneSentiment',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function compareTrendRecensioni(allFilters: AllFilters) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
    } = allFilters

    return apiService.apiAnalysisComp.post(
        'analisiCompetitor/compareTrend',
        {
            idSources: selectedSource,
            channels: selectedChannel,
            idLocations: selectedLocation,
            idTopics: selectedTopics,
            startDate: startDate,
            endDate: endDate,
            groupKey: 'competitorName',
            groupby: groupby,
            xAxes: 'date',
            xAxesType: 'data_feedback',
            xAxesCond: {},
            yAxes: 'groupDates',
            yAxesCond: {},
            yAxesType: 'countByTime',
            rAxes: null,
            rAxesCond: {},
            rAxesType: null,
            returnAnt: true,
        },
        getHeaders()
    )
}

function compareTrend(allFilters: AllFilters) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
    } = allFilters
    return apiService.apiAnalysisComp.post(
        'analisiCompetitor/compareTrend',
        {
            idSources: selectedSource,
            channels: selectedChannel,
            idLocations: selectedLocation,
            idTopics: selectedTopics,
            startDate: startDate,
            endDate: endDate,
            groupKey: 'competitorName',
            groupby: groupby,
            xAxes: 'date',
            xAxesType: 'data_rating',
            xAxesCond: {},
            yAxes: 'groupDates',
            yAxesCond: {},
            yAxesType: 'meanByTime',
            rAxes: null,
            rAxesCond: {},
            rAxesType: null,
            returnAnt: true,
        },
        getHeaders()
    )
}

function compareCols(allFilters: AllFilters, code = [0, 1, 2, 3]) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
    } = allFilters

    return apiService.apiAnalysisGeneric.post(
        'analisiGenerica/compareCols',
        {
            idSources: selectedSource,
            channels: selectedChannel,
            idLocations: selectedLocation,
            idTopics: selectedTopics,
            startDate: startDate,
            endDate: endDate,
            code: code,
            groupby: 'locationName',
            xAxes: 'sentOriginal',
            xAxesType: 'percentage',
            xAxesCond: {
                value: 1,
            },
            yAxes: 'rating',
            yAxesCond: {},
            yAxesType: 'average',
            rAxes: '_id',
            rAxesCond: {},
            rAxesType: 'occurences',
        },
        getHeaders()
    )
}

function getDistribuzioneVotiPerData(
    allFilters: AllFilters,
    code: number[],
    returnAnt: boolean,
    colX: string,
    colY: string
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code,
        topics: selectedTopics,
        returnAnt,
        colX,
        colY,
    }
    return apiService.apiAnalysisGeneric.post(
        'analisiGenerica/distValByDate',
        body,
        getHeaders()
    )
}

const AnalisiAvanzataService = {
    getTopicFiltered,
    getDistribuzioneTopic,
    getDistribuzioneSentiment,
    getDistribuzioneTopicPerSentiment,
    getDistribuzioneTopicPerData,
    getVotoMedioTopicPerData,
    getVotoMedioTopic,
    getCountTopic,
    getReviewsInfos,
    getAvgRating,
    getAvgSentiment,
    getDistribuzioneVotiPerData,
    compareCols,
    compareTrend,
    compareTrendRecensioni,
    getDistSentiment,
    getDistTopicSentiment,
    getDistVotiPerData,
    distTopicPerData,
    getDistribuzioneNps,
    npsTempo,
}

export default AnalisiAvanzataService
