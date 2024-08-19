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
    return apiService.apiUrl.post(
        '/source/getChannelSourcesFiltered',
        {},
        getHeaders()
    )
}

interface QueryData {
    id: string | string[]
    // Add other properties as needed
}

function getLocationsFiltered(code: any, returnAnt: any) {
    const body: GetLocationsFilteredBody = {
        code,
        returnAnt,
    }
    const queryClient = useQueryClient()

    return useQuery<any, Error>(
        ['location', 'locationId'],
        () =>
            apiService.apiUrl.post(
                '/location/getLocationsFiltered',
                body,
                getHeaders()
            ),
        {
            initialData: () => {
                return queryClient
                    .getQueryData<QueryData[]>('location')
                    ?.find((d) => d.id === 'locationId')
            },
            staleTime: 0,
        }
    )
}

function getTopicFiltered(includeNotAnalysed: any) {
    const body: GetTopicFilteredBody = {
        includeNotAnalysed,
    }
    return apiService.apiUrl.post('/topic/getTopicFiltered', body, getHeaders())
}

const FilterService = {
    getChannelSourcesFiltered,
    getLocationsFiltered,
    getTopicFiltered,
}

export default FilterService
