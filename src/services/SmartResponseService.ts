import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface AddEditSmartResponseBody {
    responseText: string
    srName: string
    conditions: any[]
    isAutomatic: boolean
    sources: string[]
    locations: string[]
    _id: string
}

interface GetAllSmartResponsesBody {
    returnAnt: boolean
}

interface GenerateSmartBody {
    idFeedback: string
}

interface RemoveSmartResponseBody {
    _id: string
}

function getAllSmartResponses(returnAnt: boolean) {
    const body: GetAllSmartResponsesBody = { returnAnt }
    return apiService.apiUrl.post('/smartResponse/get', body, getHeaders())
}

function generateSmart(idFeedback: string) {
    const body: GenerateSmartBody = { idFeedback }
    return apiService.apiUrl.post('/smartResponse/generate', body, getHeaders())
}

function getAllSmartResponseFeedback(body: any = {}) {
    return apiService.apiUrl.post(
        '/smartResponse/getSMByFeedback',
        body,
        getHeaders()
    )
}

function removeSmartResponse(_id: string) {
    const body: RemoveSmartResponseBody = { _id }
    return apiService.apiUrl.post('/smartResponse/remove', body, getHeaders())
}

function addSmartResponse(
    responseText: string,
    srName: string,
    conditions: any[],
    isAutomatic: boolean,
    sources: string[],
    locations: string[],
    _id: string
) {
    const body: AddEditSmartResponseBody = {
        responseText,
        srName,
        conditions,
        isAutomatic,
        sources,
        locations,
        _id,
    }
    return apiService.apiUrl.post('/smartResponse/add', body, getHeaders())
}

function editSmartResponse(
    responseText: string,
    srName: string,
    conditions: any[],
    isAutomatic: boolean,
    sources: string[],
    locations: string[],
    _id: string
) {
    const body: AddEditSmartResponseBody = {
        responseText,
        srName,
        conditions,
        isAutomatic,
        sources,
        locations,
        _id,
    }
    return apiService.apiUrl.post('/smartResponse/edit', body, getHeaders())
}

const SmartResponseService = {
    getAllSmartResponses,
    removeSmartResponse,
    addSmartResponse,
    editSmartResponse,
    getAllSmartResponseFeedback,
    generateSmart,
}

export default SmartResponseService
