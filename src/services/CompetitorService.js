import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function addCompetitor(lat,
                       lng,
                       type,
                       address,
                       numCiv,
                       city,
                       province,
                       region,
                       country,
                       zip,
                       googlePlaceID,
                       formatted_address,
                       locationName,
                       channel,
                       competitorName,
                       name,
                       items,
                       color
) {


    const body = {
        lat,
        lng,
        type,
        address,
        numCiv,
        city,
        province,
        region,
        country,
        zip,
        googlePlaceID,
        formatted_address,
        locationName,
        channel,
        competitorName,
        name,
        items,
        color
    }

    return apiService.apiUrl.post('competitors/addCompetitor', body, getHeaders())
}

function getCompetitor(type, text) {
    const body = {
        type,
        text
    }
    return apiService.apiUrl.post('competitor/googleMapsCompetitor', body, getHeaders())
}

function getAllCompetitor() {
    const body = {}
    return apiService.apiUrl.post('competitors/getAllCompetitor', body, getHeaders())
}

function assignCompetitor(idCompetitor,
                          idToEdit,
                          type) {
    const body = {
        idCompetitor,
        idToEdit,
        type
    }
    return apiService.apiUrl.post('competitors/assignCompetitor', body, getHeaders())
}

function addCompetitorSource(competitors, language) {
    const body = {
        competitors,
        language
    }
    return apiService.apiUrl.post('competitors/addSources', body, getHeaders())
}

function deleteCompetitor(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('competitors/removeCompetitor', body, getHeaders())
}

const CompetitorService = {
    addCompetitor,
    getAllCompetitor,
    getCompetitor,
    addCompetitorSource,
    deleteCompetitor,
    assignCompetitor
}

export default CompetitorService
