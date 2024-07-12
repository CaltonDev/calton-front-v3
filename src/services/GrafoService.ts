import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface GraphServiceBody {
    channels: any[]
    code: any
    endDate: any
    idLocations: any[]
    idSources: any[]
    customFilters: any
    idTopics: any[]
    multiplier: any
    startDate: any
    idProducts: any[]
}

interface AllFilters {
    startDate: any
    endDate: any
    selectedLocation: any[]
    selectedChannel: any[]
    selectedTopics: any[]
    selectedProducts: any[]
    selectedSource: any[]
    customFilters: any
}

function getGraph(allFilters: AllFilters, code: any, multiplier: any) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        customFilters,
    } = allFilters

    const body: GraphServiceBody = {
        channels: selectedChannel,
        code,
        endDate,
        idLocations: selectedLocation,
        idSources: selectedSource,
        customFilters,
        idTopics: selectedTopics,
        multiplier,
        startDate,
        idProducts: selectedProducts,
    }

    return apiService.grafoLambda.post('/startGrafo', body, getHeaders())
}

const GrafoService = {
    getGraph,
}

export default GrafoService
