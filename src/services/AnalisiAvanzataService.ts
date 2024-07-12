import apiService from './api/apiService'
/*import {
    setTopics,
    setDistribuzioneTopic,
    setDistribuzioneTopicPerSentiment,
    setDistribuzioneTopicPerData,
    setVotoMedioTopicPerData,
    setVotoMedioTopic,
    setCountTopic,
    setReviewsInfos,
    setAvgRating,
    setAvgSentiment,
    setDistribuzioneSentiment,
} from '../redux/AnalisiAvanzataState'*/
import { generateRandomColor, getNoCodeFromPlatfrom } from '../helpers/helpers'
import { getHeaders } from './api/headers'

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

export {
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
}
