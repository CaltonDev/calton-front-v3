import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getFilters(collection = null) {
    const body = {
        collection
    }
    return apiService.apiUrl.post('customfilters/getFilters', body, getHeaders())
}

function getPopulateNewFilter() {
    return apiService.apiUrl.post('customfilters/populateNewFilter', {}, getHeaders())
}

function createFilter(multiple,
                      type,
                      varsType,
                      widgetType,
                      values,
                      EP_config,
                      collection,
                      attribute,
                      name) {
    const body = {
        multiple,
        type,
        varsType,
        widgetType,
        values,
        EP_config,
        collection,
        attribute,
        name
    }
    return apiService.apiUrl.post('customfilters/createFilter', body, getHeaders())
}

function removeFilter(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('customfilters/removeFilter', body, getHeaders())
}

const CustomFilterService = {
    getFilters,
    getPopulateNewFilter,
    createFilter,
    removeFilter
}

export default CustomFilterService
