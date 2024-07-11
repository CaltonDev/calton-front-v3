import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function googleLogin(body) {
    return apiService.googleApi.post('login', body, getHeaders())
}
function getAllLocations(accounts, nextPageToken) {
    const body = {
        accounts: [accounts],
        nextPageToken
    }
    return apiService.googleApi.post('getAllLocations', body, getHeaders())
}
function getReviewsFromLocation(locations, accounts = undefined, allLocations = undefined) {
    const body = {
        locations,
        accounts,
        allLocations
    }
    return apiService.googleApi.post('getReviewsByLocation', body, getHeaders())
}
function facebookLogin(access_token, responseFB) {
    let body = {
        access_token,
        responseFB
    };
    return apiService.facebookApi.post('login', body, getHeaders())
}
function getAllPages() {
    return apiService.facebookApi.post('getAllPages', {}, getHeaders())
}
function getPagesForReviews(pages) {
    const body = {
        pages
    }
    return apiService.facebookApi.post('getReviewsByPages', body, getHeaders())
}

const ReviewService = {
    googleLogin,
    facebookLogin,
    getAllLocations,
    getAllPages,
    getPagesForReviews,
    getReviewsFromLocation
}

export default ReviewService
