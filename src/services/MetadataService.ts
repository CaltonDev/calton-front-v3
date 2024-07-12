import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface MetadataServiceBody {
    collection?: string
    _id?: string
    name?: string
    type?: string
    value?: any // Adjust type as needed
}

function getMetadata(collection: string) {
    const body: MetadataServiceBody = {
        collection,
    }
    return apiService.apiUrl.post(
        '/custommetadata/getMetadata',
        body,
        getHeaders()
    )
}

function addMetadata(collection: string, name: string, type: string) {
    const body: MetadataServiceBody = {
        collection,
        name,
        type,
    }
    return apiService.apiUrl.post(
        '/custommetadata/addMetadata',
        body,
        getHeaders()
    )
}

function handleMeta(collection: string, _id: string, name: string, value: any) {
    const body: MetadataServiceBody = {
        collection,
        _id,
        name,
        value,
    }
    return apiService.apiUrl.post(
        '/custommetadata/handleMeta',
        body,
        getHeaders()
    )
}

function removeMetadata(_id: string) {
    const body: MetadataServiceBody = {
        _id: _id,
    }
    return apiService.apiUrl.post(
        '/custommetadata/removeMeta',
        body,
        getHeaders()
    )
}

const MetadataService = {
    getMetadata,
    addMetadata,
    handleMeta,
    removeMetadata,
}

export default MetadataService
