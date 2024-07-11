import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getGraph(allFilters,
                  code,
                  multiplier) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, customFilters} = allFilters;

    const body = {
        channels: selectedChannel,
        code,
        endDate,
        idLocations: selectedLocation,
        idSources: selectedSource,
        customFilters,
        idTopics: selectedTopics,
        multiplier,
        startDate,
        idProducts: selectedProducts
    }
    return apiService.grafoLambda.post('startGrafo', body, getHeaders())
}

const GrafoService = {
    getGraph,
}

export default GrafoService
