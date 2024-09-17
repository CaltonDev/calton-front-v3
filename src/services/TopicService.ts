import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { useQuery } from 'react-query'
//import { setBestWorst } from '../redux/AnalisiAvanzataState'

interface TopicServiceBody {
    returnAnt?: boolean
    _id?: string
    sources_excluded?: any // Adjust type as needed
    name?: string
    words?: any[] // Adjust type as needed
    opLogical?: any // Adjust type as needed
    color?: string
    idSources?: any // Adjust type as needed
    startDate?: string
    endDate?: string
    groupby?: string
    channels?: any[] // Adjust type as needed
    idLocations?: any[] // Adjust type as needed
    code?: string
    idTopics?: any[] // Adjust type as needed
    idProducts?: any[] // Adjust type as needed
    allFilters?: any // Adjust type as needed
    dispatch?: any // Adjust type as needed
    idFeedback?: string
    allTopic?: any // Adjust type as needed
    customFilters?: any
}

function getTopicFiltered(returnAnt: boolean) {
    const body: TopicServiceBody = {
        returnAnt,
    }

    return useQuery<any, Error>(
        ['topicFilterd'],
        () => apiService.apiTopic.post('/getTopicFiltered', body, getHeaders()),
        {
            staleTime: 0,
        }
    )
}

function addTopic(
    _id: string,
    sources_excluded: any,
    name: string,
    words: any[],
    opLogical: any,
    color: string
) {
    const body: TopicServiceBody = {
        _id,
        sources_excluded,
        name,
        words,
        opLogical,
        color,
    }
    return apiService.apiTopic.post('/add', body, getHeaders())
}

function editTopic(
    _id: string,
    sources_excluded: any,
    name: string,
    words: any[],
    opLogical: any,
    color: string
) {
    const body: TopicServiceBody = {
        _id,
        sources_excluded,
        name,
        words,
        opLogical,
        color,
    }
    return apiService.apiTopic.post('/handleTopicChange', body, getHeaders())
}

function processTopic(_id: string) {
    const body: TopicServiceBody = {
        _id,
    }
    return apiService.apiTopic.post('/process', body, getHeaders())
}

function removeTopic(_id: string) {
    const body: TopicServiceBody = {
        _id,
    }
    return apiService.apiTopic.post('/removeTopic', body, getHeaders())
}

function distribuzioneTopicPerData(
    idSources: any[],
    startDate: string,
    endDate: string,
    groupby: string,
    channels: any[],
    idLocations: any[],
    code: string,
    idTopics: any[],
    idProducts: any[]
) {
    const body: TopicServiceBody = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts,
    }
    return apiService.apiAnalAdvTopic.post(
        '/distribuzioneTopicPerData',
        body,
        getHeaders()
    )
}

function votoMedioTopicPerData(
    idSources: any[],
    startDate: string,
    endDate: string,
    groupby: string,
    channels: any[],
    idLocations: any[],
    code: string,
    idTopics: any[],
    idProducts: any[]
) {
    const body: TopicServiceBody = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts,
    }
    return apiService.apiAnalAdvTopic.post(
        '/votoMedioTopicPerData',
        body,
        getHeaders()
    )
}

function votoMedioTopic(
    idSources: any[],
    startDate: string,
    endDate: string,
    groupby: string,
    channels: any[],
    idLocations: any[],
    code: string,
    idTopics: any[],
    idProducts: any[]
) {
    const body: TopicServiceBody = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts,
    }
    return apiService.apiAnalAdvTopic.post(
        '/votoMedioTopic',
        body,
        getHeaders()
    )
}

function distribuzioneTopicPerSentiment(
    idSources: any[],
    startDate: string,
    endDate: string,
    groupby: string,
    channels: any[],
    idLocations: any[],
    code: string,
    idTopics: any[],
    idProducts: any[]
) {
    const body: TopicServiceBody = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts,
    }
    return apiService.apiAnalAdvTopic.post(
        '/distribuzioneTopicPerSentiment',
        body,
        getHeaders()
    )
}

function sentTopAndWorst(allFilters: any, code: string, dispatch: any) {
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

    const body: TopicServiceBody = {
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
        //dispatch(setBestWorst(null))
        apiService.apiAnalAdvTopic
            .post('/sentTopAndWorst', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data
                    //dispatch(setBestWorst(data))
                }
                resolve(res)
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
    })
}

function handleTopicToFeedback(
    idFeedback: string,
    allTopic: any // Adjust type as needed
) {
    const body: TopicServiceBody = {
        idFeedback,
        allTopic,
    }
    return apiService.apiTopic.post(
        '/handleTopicToFeedback',
        body,
        getHeaders()
    )
}

const TopicService = {
    getTopicFiltered,
    addTopic,
    editTopic,
    processTopic,
    removeTopic,
    distribuzioneTopicPerData,
    votoMedioTopicPerData,
    votoMedioTopic,
    distribuzioneTopicPerSentiment,
    sentTopAndWorst,
    handleTopicToFeedback,
}

export default TopicService
