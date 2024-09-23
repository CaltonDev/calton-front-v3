import apiService from './api/apiService'
import store from '../store/store'
//import { setSurveyData } from '../redux/SourcesFiltered'
import { getHeaders } from './api/headers'
import { useQuery } from 'react-query'

interface SourceFilteredBody {
    code: number[]
    fromSurveyTab?: boolean
}

interface RemoveSourceBody {
    _id: string
    isSurvey: boolean
    typeformID?: string
}

interface AddSurveyBody {
    name: string
    totalFeedback: number
    locationID: string
    formatted_address: string
    googlePlaceID: string
    from: string
    code: string
}

interface DuplicateSurveyBody {
    formId: string
    name: string
    totalFeedback: number
    locationID: string
    formatted_address: string
    googlePlaceID: string
    from: string
    code: string
}

interface GetSurveysTPBody {
    typeformID: string
}

/*interface ManageQuestionBody {
    // Define this based on actual requirements
}*/

function getSourcesFiltered(code: number[], fromSurveyTab?: boolean) {
    const body: SourceFilteredBody = {
        code,
        fromSurveyTab,
    }

    return useQuery<any, Error>(
        ['sourcesFiltered'],
        () =>
            apiService.apiUrl.post(
                '/source/getSourcesFiltered',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getAllSources(code: number[], returnAnt: boolean) {
    const body = {
        code,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['sourcesFiltered', 'sourcesFilteredId'],
        () =>
            apiService.apiSource.post(
                '/getSourcesFiltered',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function removeSource(body: RemoveSourceBody) {
    return new Promise((resolve, reject) => {
        apiService.apiSource
            .post('/removeSource', body, getHeaders())
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

function addEmptySurvey(body: AddSurveyBody) {
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post('/source/addEmptySurvey', body, getHeaders())
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

function duplicateSurvey(body: DuplicateSurveyBody) {
    return apiService.apiUrl.post('/source/duplicateSurvey', body, getHeaders())
}

function getSurveysTP(body: GetSurveysTPBody, dispatch: any) {
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .get(`/surveysTP/forms/${body?.typeformID}`, {
                headers: getHeaders().headers,
            })
            .then((res) => {
                const data = res?.data
                //dispatch(setSurveyData(data))
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

function manageQuestion(body: any /*ManageQuestionBody*/, dispatch: any) {
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .put(`/surveysTP/forms`, body, {
                headers: getHeaders().headers,
            })
            .then((res) => {
                const data = res?.data
                //dispatch(setSurveyData(data))
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const SourcesService = {
    getSourcesFiltered,
    getAllSources,
    removeSource,
    addEmptySurvey,
    getSurveysTP,
    manageQuestion,
    duplicateSurvey,
}

export default SourcesService
