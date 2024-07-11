import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getAllSmartResponses(returnAnt) {
    const body = {
        returnAnt
    }
    return apiService.apiUrl.post('smartResponse/get', body, getHeaders())
}

function generateSmart(idFeedback) {
    let body = {
        idFeedback
    }
    return apiService.apiUrl.post('smartResponse/generate', body, getHeaders())
}

function getAllSmartResponseFeedback(body = {}) {
    return apiService.apiUrl.post('smartResponse/getSMByFeedback', body, getHeaders())
}

function removeSmartResponse(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('smartResponse/remove', body, getHeaders())
}

function addSmartResponse(
    responseText,
    srName,
    conditions,
    isAutomatic,
    sources,
    locations,
    _id
) {
    const body = {
        responseText,
        srName,
        conditions,
        isAutomatic,
        sources,
        locations,
        _id
    }
    return apiService.apiUrl.post('smartResponse/add', body, getHeaders())
}

function editSmartResponse(
    responseText,
    srName,
    conditions,
    isAutomatic,
    sources,
    locations,
    _id
) {
    const body = {
        responseText,
        srName,
        conditions,
        isAutomatic,
        sources,
        locations,
        _id
    }
    return apiService.apiUrl.post('smartResponse/edit', body, getHeaders())
}

const SmartResponseService = {
    getAllSmartResponses,
    removeSmartResponse,
    addSmartResponse,
    editSmartResponse,
    getAllSmartResponseFeedback,
    generateSmart
}

export default SmartResponseService
