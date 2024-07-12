import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface CreateFilterBody {
    multiple: boolean
    type: string
    varsType: string
    widgetType: string
    values: any[] // Adjust type as per actual data structure
    EP_config: any // Adjust type as per actual data structure
    collection: any // Adjust type as per actual data structure
    attribute: any // Adjust type as per actual data structure
    name: string
}

function getFilters(collection: any = null) {
    const body = {
        collection,
    }
    return apiService.apiUrl.post(
        '/customfilters/getFilters',
        body,
        getHeaders()
    )
}

function getPopulateNewFilter() {
    return apiService.apiUrl.post(
        '/customfilters/populateNewFilter',
        {},
        getHeaders()
    )
}

function createFilter(body: CreateFilterBody) {
    return apiService.apiUrl.post(
        '/customfilters/createFilter',
        body,
        getHeaders()
    )
}

function removeFilter(_id: string) {
    const body = {
        _id,
    }
    return apiService.apiUrl.post(
        '/customfilters/removeFilter',
        body,
        getHeaders()
    )
}

const CustomFilterService = {
    getFilters,
    getPopulateNewFilter,
    createFilter,
    removeFilter,
}

export default CustomFilterService
