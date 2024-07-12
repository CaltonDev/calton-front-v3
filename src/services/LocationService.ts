import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface LocationServiceBody {
    code?: string
    url?: string
    location?: string
    _id?: string
    body?: any // Adjust as per your specific structure
}

function getUserLocations(code: string) {
    const body: LocationServiceBody = {
        code,
    }
    return apiService.apiUrl.post(
        '/location/getLocationsFiltered',
        body,
        getHeaders()
    )
}

function addLocation(url: string, location: string) {
    const body: LocationServiceBody = {
        url,
        location,
    }
    return apiService.apiUrl.post('/location/add', body, getHeaders())
}

function removeLocation(_id: string) {
    const body: LocationServiceBody = {
        _id,
    }
    return apiService.apiUrl.post(
        '/location/removeLocation',
        body,
        getHeaders()
    )
}

function editLocation(body: LocationServiceBody) {
    return apiService.apiUrl.post('/location/editLocation', body, getHeaders())
}

const LocationService = {
    getUserLocations,
    addLocation,
    removeLocation,
    editLocation,
}

export default LocationService
