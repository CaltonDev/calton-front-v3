import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface IntegrationServiceBody {
    code?: any
    param?: any
    body?: any
}

function getIntegrations(code: any) {
    const body: IntegrationServiceBody = { code }
    return apiService.apiUrl.post(
        '/integration/getIntegrations',
        body,
        getHeaders()
    )
}

function searchTrustpilot(param: any) {
    const body: IntegrationServiceBody = { param }
    return apiService.trustpilotApi.get('/search/' + param, getHeaders())
}

function IntegrationsFileUpload(body: IntegrationServiceBody['body']) {
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post('/source/upload', body, getHeaders())
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const IntegrationService = {
    getIntegrations,
    IntegrationsFileUpload,
    searchTrustpilot,
}

export default IntegrationService
