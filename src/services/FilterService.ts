import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { useQuery, useQueryClient } from 'react-query'

interface GetLocationsFilteredBody {
    code: any
    returnAnt: any
}

interface GetTopicFilteredBody {
    includeNotAnalysed: any
}

function getChannelSourcesFiltered() {
    return useQuery<any, Error>(
        ['channelSourcesFiltered'],
        () =>
            apiService.apiUrl.post(
                '/source/getChannelSourcesFiltered',
                {},
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getLocationsFiltered(code: any, returnAnt?: any) {
    const body: GetLocationsFilteredBody = {
        code,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['location', 'locationId'],
        () =>
            apiService.apiUrl.post(
                '/location/getLocationsFiltered',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getTopicFiltered(includeNotAnalysed: boolean) {
    const body: GetTopicFilteredBody = {
        includeNotAnalysed,
    }
    return useQuery<any, Error>(
        ['topicFiltered'],
        () =>
            apiService.apiUrl.post(
                '/topic/getTopicFiltered',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

const FilterService = {
    getChannelSourcesFiltered,
    getLocationsFiltered,
    getTopicFiltered,
}

export default FilterService
