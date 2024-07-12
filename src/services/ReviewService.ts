import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface GoogleLoginBody {
    [key: string]: any
}

interface GetAllLocationsBody {
    accounts: string[]
    nextPageToken?: string
}

interface GetReviewsFromLocationBody {
    locations: string[]
    accounts?: string[]
    allLocations?: string[]
}

interface FacebookLoginBody {
    access_token: string
    responseFB: any
}

interface GetPagesForReviewsBody {
    pages: string[]
}

function googleLogin(body: GoogleLoginBody) {
    return apiService.googleApi.post('login', body, getHeaders())
}

function getAllLocations(accounts: string, nextPageToken?: string) {
    const body: GetAllLocationsBody = {
        accounts: [accounts],
        nextPageToken,
    }
    return apiService.googleApi.post('getAllLocations', body, getHeaders())
}

function getReviewsFromLocation(
    locations: string[],
    accounts?: string[],
    allLocations?: string[]
) {
    const body: GetReviewsFromLocationBody = {
        locations,
        accounts,
        allLocations,
    }
    return apiService.googleApi.post(
        '/getReviewsByLocation',
        body,
        getHeaders()
    )
}

function facebookLogin(access_token: string, responseFB: any) {
    const body: FacebookLoginBody = {
        access_token,
        responseFB,
    }
    return apiService.facebookApi.post('/login', body, getHeaders())
}

function getAllPages() {
    return apiService.facebookApi.post('/getAllPages', {}, getHeaders())
}

function getPagesForReviews(pages: string[]) {
    const body: GetPagesForReviewsBody = {
        pages,
    }
    return apiService.facebookApi.post('/getReviewsByPages', body, getHeaders())
}

const ReviewService = {
    googleLogin,
    facebookLogin,
    getAllLocations,
    getAllPages,
    getPagesForReviews,
    getReviewsFromLocation,
}

export default ReviewService
