import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { useQuery } from 'react-query'

interface AddCompetitorBody {
    lat: number
    lng: number
    type: string
    address: string
    numCiv: string
    city: string
    province: string
    region: string
    country: string
    zip: string
    googlePlaceID: string
    formatted_address: string
    locationName: string
    channel: string
    competitorName: string
    name: string
    items: any[] // Adjust type as per actual data structure
    color: string
}

function addCompetitor(
    lat: number,
    lng: number,
    type: string,
    address: string,
    numCiv: string,
    city: string,
    province: string,
    region: string,
    country: string,
    zip: string,
    googlePlaceID: string,
    formatted_address: string,
    locationName: string,
    channel: string,
    competitorName: string,
    name: string,
    items: any[],
    color: string
): Promise<any> {
    const body: AddCompetitorBody = {
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
        color,
    }

    return apiService.apiUrl.post(
        '/competitors/addCompetitor',
        body,
        getHeaders()
    )
}

function getCompetitor(type: string[], text: string): Promise<any> {
    const body = {
        type,
        text,
    }

    return apiService.apiUrl.post(
        '/competitor/googleMapsCompetitor',
        body,
        getHeaders()
    )
}

function getAllCompetitor() {
    return useQuery<any, Error>(
        ['competitors/getAllCompetitor'],
        () =>
            apiService.apiUrl.post(
                '/competitors/getAllCompetitor',
                {},
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function assignCompetitor(
    idCompetitor: string,
    idToEdit: string,
    type: string
): Promise<any> {
    const body = {
        idCompetitor,
        idToEdit,
        type,
    }

    return apiService.apiUrl.post(
        '/competitors/assignCompetitor',
        body,
        getHeaders()
    )
}

function addCompetitorSource(
    competitors: any[],
    language: string
): Promise<any> {
    const body = {
        competitors,
        language,
    }

    return apiService.apiUrl.post('/competitors/addSources', body, getHeaders())
}

function deleteCompetitor(_id: string): Promise<any> {
    const body = {
        _id,
    }

    return apiService.apiUrl.post(
        '/competitors/removeCompetitor',
        body,
        getHeaders()
    )
}

const CompetitorService = {
    addCompetitor,
    getAllCompetitor,
    getCompetitor,
    addCompetitorSource,
    deleteCompetitor,
    assignCompetitor,
}

export default CompetitorService
