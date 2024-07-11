import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getMetadata(collection) {
    const body = {
        collection: collection
    }
    return apiService.apiUrl.post('custommetadata/getMetadata', body, getHeaders())
}

function addMetadata(collection, name, type) {
    const body = {
        collection,
        name,
        type
    }
    return apiService.apiUrl.post('custommetadata/addMetadata', body, getHeaders())
}

function handleMeta(collection, _id, name, value) {
    const body = {
        collection,
        _id,
        name,
        value
    }
    return apiService.apiUrl.post('custommetadata/handleMeta', body, getHeaders())
}

function removeMetadata(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('custommetadata/removeMeta', body, getHeaders())
}

const MetadataService = {
    getMetadata,
    addMetadata,
    handleMeta,
    removeMetadata
}

export default MetadataService
