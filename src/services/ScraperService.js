import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function createGoogleScraper(body) {
    return apiService.googleScraper.post('createScraper', body, getHeaders())
}

function createTripAdvisorScraper(body) {
    return apiService.tripScraper.post('createScraper', body, getHeaders())
}
function createTrustedShopsScraper(body) {
    return apiService.trustedShopsScraper.post('createScraper', body, getHeaders())
}

function createIndeedScraper(body) {
    return apiService.indeedScraper.post('createScraper', body, getHeaders())
}

function createAmazonScraper(body) {
    return apiService.amazonScraper.post('createScraper', body, getHeaders())
}
function createForkScraper(body) {
    return apiService.theforkScraper.post('createScraper', body, getHeaders())
}

function createJusteatScraper(body) {
    return apiService.justeatScraper.post('createScraper', body, getHeaders())
}

function createTrustAdvisorScraper(body) {
    return apiService.trustpilotApi.post('create', body, getHeaders())
}

function replyReviewTrust(resp,
                          idFeedback,
                          urlPart,
                          idSource,
                          idSmartResponse) {
    const body = {
        resp,
        idFeedback,
        urlPart,
        idSource,
        idSmartResponse
    }
    return apiService.trustpilotApi.post('replyReview', body, getHeaders())
}

function loginTrustpilot(body) {
    return apiService.trustpilotApi.post('login', body, getHeaders())
}

const ScraperService = {
    createGoogleScraper,
    createTripAdvisorScraper,
    createTrustAdvisorScraper,
    createTrustedShopsScraper,
    createForkScraper,
    createIndeedScraper,
    createAmazonScraper,
    replyReviewTrust,
    loginTrustpilot,
    createJusteatScraper
}

export default ScraperService
