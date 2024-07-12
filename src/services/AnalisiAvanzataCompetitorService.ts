import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface AllFilters {
    startDate: string
    endDate: string
    selectedLocation: string[]
    selectedChannel: string[]
    selectedTopics: string[]
    selectedSource: string[]
    groupby: string
}

function barChartCompetitor(allFilters: AllFilters): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        groupby,
    } = allFilters

    const body = {
        idSources: selectedSource,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        startDate: startDate,
        endDate: endDate,
        groupKey: 'competitorName',
        groupby: groupby,
        xAxes: 'topics',
        xAxesType: 'list',
        xAxesCond: {},
        yAxes: 'sentiment',
        yAxesCond: {},
        yAxesType: 'count',
        returnAnt: true,
    }

    return apiService.apiAnalysisAvaComp
        .post('/barChartCompetitor', body, getHeaders())
        .then((res) => res.data)
        .catch((error) => {
            console.error('Error in barChartCompetitor:', error)
            throw error
        })
}

function distribuzioneTopic(
    allFilters: AllFilters,
    groupKey = 'topics',
    count = 'count',
    childrenKey = 'competitorName'
): Promise<any> {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
    } = allFilters

    const body = {
        idSources: selectedSource,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        startDate: startDate,
        endDate: endDate,
        childrenKey: childrenKey,
        groupKey: groupKey,
        type: count,
    }

    return apiService.apiAnalysisAvaComp
        .post('/distribution', body, getHeaders())
        .then((res) => res.data)
        .catch((error) => {
            console.error('Error in distribuzioneTopic:', error)
            throw error
        })
}

const AnalisiAvanzataCompetitorService = {
    barChartCompetitor,
    distribuzioneTopic,
}

export default AnalisiAvanzataCompetitorService
