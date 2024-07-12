import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface ScraperBody {
    [key: string]: any
}

interface ReplyReviewTrustBody {
    resp: string
    idFeedback: string
    urlPart: string
    idSource: string
    idSmartResponse: string
}

function createGoogleScraper(body: ScraperBody) {
    return apiService.googleScraper.post('/createScraper', body, getHeaders())
}

function createTripAdvisorScraper(body: ScraperBody) {
    return apiService.tripScraper.post('/createScraper', body, getHeaders())
}

function createTrustedShopsScraper(body: ScraperBody) {
    return apiService.trustedShopsScraper.post(
        '/createScraper',
        body,
        getHeaders()
    )
}

function createIndeedScraper(body: ScraperBody) {
    return apiService.indeedScraper.post('/createScraper', body, getHeaders())
}

function createAmazonScraper(body: ScraperBody) {
    return apiService.amazonScraper.post('/createScraper', body, getHeaders())
}

function createForkScraper(body: ScraperBody) {
    return apiService.theforkScraper.post('/createScraper', body, getHeaders())
}

function createJusteatScraper(body: ScraperBody) {
    return apiService.justeatScraper.post('/createScraper', body, getHeaders())
}

function createTrustAdvisorScraper(body: ScraperBody) {
    return apiService.trustpilotApi.post('/create', body, getHeaders())
}

function replyReviewTrust(
    resp: string,
    idFeedback: string,
    urlPart: string,
    idSource: string,
    idSmartResponse: string
) {
    const body: ReplyReviewTrustBody = {
        resp,
        idFeedback,
        urlPart,
        idSource,
        idSmartResponse,
    }
    return apiService.trustpilotApi.post('/replyReview', body, getHeaders())
}

function loginTrustpilot(body: ScraperBody) {
    return apiService.trustpilotApi.post('/login', body, getHeaders())
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
    createJusteatScraper,
}

export default ScraperService
