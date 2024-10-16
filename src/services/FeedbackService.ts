import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { useQuery, useQueryClient, UseQueryResult } from 'react-query'

interface AllFilters {
    startDate: string
    endDate: string
    selectedLocation: string[]
    selectedChannel: string[]
    selectedTopics: string[]
    selectedProducts: string[]
    selectedSource: string[]
    customFilters: any // Adjust type as per your application's actual customFilters type
}

interface GetFeedbacksBody {
    idSources?: string[] | undefined
    columns?: string[]
    simplified?: boolean
    code?: string | undefined
    skip?: number | undefined
    limit?: number | undefined
    sort?: string | undefined
    search?: string | undefined
    customFilters?: any | undefined // Adjust type as per actual customFilters type
    download?: boolean | undefined
    returnFormatted?: boolean | undefined
    typeDownload?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    idLocations?: string[] | undefined
    idTopics?: string[] | undefined
    antTable?: boolean | undefined
    idMetadata?: string | undefined
    idProducts?: string[] | undefined
    words?: string[] | undefined
    lemmas?: string[] | undefined
    returnAnt?: boolean | undefined
}

interface EditFeedbackSentimentBody {
    idFeedback: any
    textRisposta: any
    sourceFrom: any
    urlToAnsw: any
    idSource: any
    idSmartResponse: any
    sentiment: any
    autoGeneratedGPT: any
}

interface GetFeedbackFromGraphBody extends GetFeedbacksBody {
    words: any
    code: any
    channels?: string[]
}

interface ReplyFeedbackBody {
    resp: any
    idFeedback: any
    urlPart: any
    idSource: any
    idSmartResponse: any
}

interface GetInfoFeedbacksBody {
    idSources?: string[] | undefined
    columns?: string[]
    channels?: string[]
    simplified?: boolean
    code?: string | undefined
    skip?: number | undefined
    limit?: number | undefined
    sort?: string | undefined
    search?: string | undefined
    customFilters?: any | undefined // Adjust type as per actual customFilters type
    download?: boolean | undefined
    returnFormatted?: boolean | undefined
    typeDownload?: string | undefined
    startDate?: string | undefined
    endDate?: string | undefined
    idLocations?: string[] | undefined
    idTopics?: string[] | undefined
    antTable?: boolean | undefined
    idMetadata?: string | undefined
    idProducts?: string[] | undefined
    words?: string[] | undefined
    lemmas?: string[] | undefined
    returnAnt?: boolean | undefined
}

interface ApiService {
    apiFeedback: {
        post: (
            url: string,
            body: GetInfoFeedbacksBody,
            headers: HeadersInit
        ) => Promise<Response>
    }
}

interface QueryData {
    id: string | string[]
    // Add other properties as needed
}

function getFeedbacks(
    idSources: any | undefined,
    allFilters: AllFilters,
    columns: any,
    simplified: any,
    code: any,
    skip: any,
    limit: any,
    sort: any,
    search: any,
    download: any,
    returnFormatted: any,
    typeDownload: any,
    antTable: any,
    idMetadata: any,
    words: any | null,
    lemmas: any | null,
    returnAnt = true,
    wordFilter: any | undefined = undefined
): UseQueryResult<any, Error> {
    const queryClient = useQueryClient()

    const body: GetInfoFeedbacksBody = {
        idSources: idSources ? idSources : allFilters.selectedSource,
        columns,
        channels: allFilters.selectedChannel,
        simplified,
        code,
        skip,
        limit,
        sort,
        search,
        customFilters: wordFilter ? allFilters.customFilters : [],
        download,
        returnFormatted,
        typeDownload,
        startDate: allFilters.startDate,
        endDate: allFilters.endDate,
        idLocations: allFilters.selectedLocation,
        idTopics: allFilters.selectedTopics,
        antTable,
        idMetadata,
        idProducts: allFilters.selectedProducts,
        words: words ?? undefined,
        lemmas: lemmas ?? undefined,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['idFeedbacks', allFilters, skip, limit],
        () =>
            apiService.apiFeedback.post(
                '/getFeedback',
                body,
                getHeaders(false, true)
            ),
        {
            staleTime: 0,
        }
    )
}

function editFeedbackSentiment(
    idFeedback: any,
    textRisposta: any,
    sourceFrom: any,
    urlToAnsw: any,
    idSource: any,
    idSmartResponse: any,
    sentiment: any,
    autoGeneratedGPT: any
): Promise<any> {
    const body: EditFeedbackSentimentBody = {
        idFeedback,
        textRisposta,
        sourceFrom,
        urlToAnsw,
        idSource,
        idSmartResponse,
        sentiment,
        autoGeneratedGPT,
    }
    return apiService.apiUrl.post('/editFeedback/edit', body, getHeaders())
}

function getFeedbackFromGraph(
    allFilters: AllFilters,
    words: any,
    code: any
): Promise<any> {
    const body: GetFeedbackFromGraphBody = {
        idSources: allFilters.selectedSource,
        words,
        channels: allFilters.selectedChannel,
        code,
        endDate: allFilters.endDate,
        idLocations: allFilters.selectedLocation,
        idTopics: allFilters.selectedTopics,
        startDate: allFilters.startDate,
    }
    return apiService.apiFeedback.post(
        '/getFeedbackFromGraph',
        body,
        getHeaders()
    )
}

function replyFeedbackFacebook(
    resp: any,
    idFeedback: any,
    urlPart: any,
    idSource: any,
    idSmartResponse: any
): Promise<any> {
    const body: ReplyFeedbackBody = {
        resp,
        idFeedback,
        urlPart,
        idSource,
        idSmartResponse,
    }
    return apiService.facebookApi.post('/replyReview', body, getHeaders())
}

function replyFeedbackGoogle(
    resp: any,
    idFeedback: any,
    urlPart: any,
    idSource: any,
    idSmartResponse: any
): Promise<any> {
    const body: ReplyFeedbackBody = {
        resp,
        idFeedback,
        urlPart,
        idSource,
        idSmartResponse,
    }
    return apiService.googleApi.post('/replyReview', body, getHeaders())
}

function getInfoFeedbacks(
    idSources: any | undefined,
    allFilters: AllFilters,
    columns: any,
    simplified: any,
    code: any,
    skip: any,
    limit: any,
    sort: any,
    search: any,
    download: any,
    returnFormatted: any,
    typeDownload: any,
    antTable: any,
    idMetadata: any,
    words: any,
    lemmas: any,
    returnAnt: boolean,
    wordFilter: any | undefined
): UseQueryResult<any, Error> {
    const body: GetInfoFeedbacksBody = {
        idSources: idSources ? idSources : allFilters.selectedSource,
        columns,
        channels: allFilters.selectedChannel,
        simplified,
        code,
        skip,
        limit,
        sort,
        search,
        customFilters: wordFilter ? wordFilter : allFilters.customFilters,
        download,
        returnFormatted,
        typeDownload,
        startDate: allFilters.startDate,
        endDate: allFilters.endDate,
        idLocations: allFilters.selectedLocation,
        idTopics: allFilters.selectedTopics,
        antTable,
        idMetadata,
        idProducts: allFilters.selectedProducts,
        words,
        lemmas,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['idInfoFeedbacks', allFilters],
        () => apiService.apiFeedback.post('/getInfo', body, getHeaders()),
        {
            staleTime: 0,
        }
    )
}

const FeedbackService = {
    getFeedbacks,
    getInfoFeedbacks,
    editFeedbackSentiment,
    replyFeedbackFacebook,
    replyFeedbackGoogle,
    getFeedbackFromGraph,
}

export default FeedbackService
