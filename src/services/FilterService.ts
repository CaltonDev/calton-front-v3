import apiService from './api/apiService'
import { getHeaders } from './api/headers'

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

function getLocationsFiltered(code: any, returnAnt: any) {
    const body: GetLocationsFilteredBody = {
        code,
        returnAnt,
    }
    return apiService.apiUrl.post(
        '/location/getLocationsFiltered',
        body,
        getHeaders()
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
