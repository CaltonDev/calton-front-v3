import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getChannelSourcesFiltered() {
    return apiService.apiUrl.post('source/getChannelSourcesFiltered', {}, getHeaders())
}
function getLocationsFiltered(code, returnAnt) {
    const body = {
        code,
        returnAnt
    }
    return apiService.apiUrl.post('location/getLocationsFiltered', body, getHeaders())
}
function getTopicFiltered(includeNotAnalysed) {
    const body = {
        includeNotAnalysed
    }
    return apiService.apiUrl.post('topic/getTopicFiltered', body, getHeaders())
}

const FilterService = {
    getChannelSourcesFiltered,
    getLocationsFiltered,
    getTopicFiltered
}

export default FilterService
