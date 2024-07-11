import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getUserLocations(code) {
    const body = {
        code
    }
    return apiService.apiUrl.post('location/getLocationsFiltered', body, getHeaders())
}
function addLocation(url, location) {
    const body = {
        url,
        location
    }
    return apiService.apiUrl.post('location/add', body, getHeaders())
}
function removeLocation(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('location/removeLocation', body, getHeaders())
}

function editLocation(body) {
    return apiService.apiUrl.post('location/editLocation', body, getHeaders())
}

const LocationService = {
    getUserLocations,
    addLocation,
    removeLocation,
    editLocation
}

export default LocationService
