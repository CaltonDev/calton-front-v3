import apiService from './api/apiService'
import { getNoCodeFromPlatfrom } from '../helpers/helpers'
import { getHeaders } from './api/headers'
import { AllFiltersInterface } from './interfaces/interfaces'
import { useQuery, useQueryClient } from 'react-query'

function getAverageByTime(
    allFilters: AllFiltersInterface,
    type: string,
    columnDateToGroup: string | undefined,
    nocode = getNoCodeFromPlatfrom(),
    columns: any[] | undefined = undefined,
    returnAnt = false,
    isMultiChoice: boolean | undefined = undefined,
    idSources: string[] = []
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources.length ? idSources : selectedSource,
        type,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        code: nocode,
        idTopics: selectedTopics,
        customFilters,
        columns,
        returnAnt,
        isMultiChoice,
        idProducts: selectedProducts,
    }

    return useQuery<any, Error>(
        ['averageByTime', `averageByTimeId + ${type}`],
        () =>
            apiService.apiAnalysisStandard.post(
                '/getAverageByTime',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getDistribuzioneVoti(
    allFilters: AllFiltersInterface,
    columnDateToGroup: string,
    columns: any[] = [],
    returnAnt = false,
    colX: string | undefined = undefined,
    compactValues: boolean,
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        customFilters,
    } = allFilters
    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        code: getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt,
        colX: colX,
        idProducts: selectedProducts,
        compactValues,
    }
    return apiService.apiAnalysisStandard.post(
        '/countSingleCol',
        body,
        getHeaders()
    )
}

function getCountCols(
    allFilters: AllFiltersInterface,
    columnDateToGroup: string,
    columns: any[] = [],
    returnAnt = false,
    colX: string | undefined = undefined,
    isMultiChoice = false,
    idSources: string[] | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedSource,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        code: getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt,
        colX: colX,
        isMultiChoice: isMultiChoice,
    }
    return apiService.apiAnalysisStandard.post('/countCols', body, getHeaders())
}

function wordsCountBUBBLE(
    allFilters: AllFiltersInterface,
    numCommons: number,
    code = getNoCodeFromPlatfrom()
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters
    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        customFilters,
        numCommons,
        code,
        idProducts: selectedProducts,
    }

    return useQuery<any, Error>(
        ['bubbles', 'bubblesId'],
        () =>
            apiService.apiAnalysisStandard.post(
                '/wordCloud',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function distribuzioneRecensioniPerData(
    allFilters: AllFiltersInterface,
    nocode: number[] | undefined = undefined,
    columns: any[] = [],
    returnAnt = false,
    idSources?: string[]
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby,
        customFilters,
    } = allFilters

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        code: nocode,
        customFilters,
        columns,
        returnAnt,
        idProducts: selectedProducts,
    }
    return useQuery<any, Error>(
        ['distribuzioneRecensioniPerData', 'distribuzioneRecensioniPerDataId'],
        () =>
            apiService.apiAnalysisStandard.post(
                '/ColPerData',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getSourcesHome(
    allFilters: AllFiltersInterface,
    nocode = getNoCodeFromPlatfrom(),
    includeTypeformInfo = false,
    download = false,
    columnDateToGroup: string | null = null,
    returnAnt = true,
    fromHome = false,
    id: string | undefined = undefined
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        groupby = null,
        customFilters,
    } = allFilters

    const body = {
        idSources: id ? id : selectedSource,
        code: nocode,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        customFilters,
        download,
        includeTypeformInfo: includeTypeformInfo,
        columnDateToGroup,
        groupby: groupby,
        idProducts: selectedProducts,
        returnAnt,
        fromHome,
    }
    return useQuery<any, Error>(
        ['sourcesHome', 'sourcesHomeId'],
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

function getDistributionReccomandation(
    allFilters: AllFiltersInterface,
    colName: string[] = ['tipo_raccomandazione'],
    columnDateToGroup = 'Date',
    code: number[],
    returnAnt: boolean
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
    } = allFilters

    const body = {
        colName,
        idSources: selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        code,
        idTopics: selectedTopics,
        idProducts: selectedProducts,
        returnAnt,
    }

    return useQuery<any, Error>(
        ['distribuzioneReccomendation', 'distribuzioneReccomendationId'],
        () =>
            apiService.apiAnalysisStandard.post(
                '/countColumn',
                body,
                getHeaders()
            ),
        {
            staleTime: 0,
        }
    )
}

function getFeedbackSimplifiedHome(
    allFilters: AllFiltersInterface,
    wordSelected: Record<string, any> = {},
    code = getNoCodeFromPlatfrom(),
    simplified = true,
    returnAnt: boolean
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        customFilters,
    } = allFilters

    const body = {
        idSources: selectedSource,
        code: code,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        sort: [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        skip: 0,
        customFilters:
            wordSelected && wordSelected.sentiment
                ? [
                      ...customFilters,
                      {
                          _id: null,
                          collection: 'feedback',
                          EP_config: null,
                          attribute: 'sentiment',
                          selectedCustom: [parseInt(wordSelected.sentiment)],
                      },
                  ]
                : customFilters,
        download: undefined,
        typeDownload: undefined,
        limit: 5,
        simplified: simplified,
        returnAnt,
        returnFormatted: true,
        search: null,
        lemmas: wordSelected?.word || null,
        idProducts: selectedProducts,
    }
    return apiService.apiFeedback.post('/getFeedback', body, getHeaders())
}

function getInfoFeedbackHome(
    allFilters: AllFiltersInterface,
    wordSelected: Record<string, any> = {},
    code = getNoCodeFromPlatfrom(),
    simplified = true
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
        customFilters,
    } = allFilters
    const body = {
        idSources: selectedSource,
        code: code,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        sort: [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        skip: 0,
        customFilters:
            wordSelected && wordSelected.sentiment
                ? [
                      ...customFilters,
                      {
                          _id: null,
                          collection: 'feedback',
                          EP_config: null,
                          attribute: 'sentiment',
                          selectedCustom: [parseInt(wordSelected.sentiment)],
                      },
                  ]
                : customFilters,
        download: undefined,
        typeDownload: undefined,
        limit: 5,
        simplified: simplified,
        returnFormatted: true,
        search: null,
        lemmas: wordSelected?.word || null,
        idProducts: selectedProducts,
    }
    return apiService.apiFeedback.post('/getInfo', body, getHeaders())
}

function compareCols(allFilters: AllFiltersInterface) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
    } = allFilters

    return apiService.apiAnalysisComp.post(
        '/analisiCompetitor/compareCols',
        {
            idSources: selectedSource,
            channels: selectedChannel,
            idLocations: selectedLocation,
            idTopics: selectedTopics,
            startDate: startDate,
            endDate: endDate,
            groupby: 'competitorName',
            xAxes: 'sentOriginal',
            xAxesType: 'percentage',
            xAxesCond: {
                value: 1,
            },
            yAxes: 'rating',
            yAxesCond: {},
            yAxesType: 'average',
            rAxes: '_id',
            rAxesCond: {},
            rAxesType: 'occurences',
            returnAnt: true,
            selectedProducts,
        },
        getHeaders()
    )
}

function compareMainKPI(
    allFilters: AllFiltersInterface,
    returnSentiment = false
) {
    const {
        startDate,
        endDate,
        selectedLocation,
        selectedChannel,
        selectedTopics,
        selectedProducts,
        selectedSource,
    } = allFilters

    return apiService.apiAnalysisComp.post(
        '/analisiCompetitor/compareMainKPI',
        {
            idSources: selectedSource,
            channels: selectedChannel,
            idLocations: selectedLocation,
            idTopics: selectedTopics,
            startDate: startDate,
            endDate: endDate,
            groupKey: 'competitorName',
            returnSentiment: returnSentiment,
            selectedProducts,
        },
        getHeaders()
    )
}

const HomeService = {
    getAverageByTime,
    distribuzioneRecensioniPerData,
    getDistributionReccomandation,
    getDistribuzioneVoti,
    getSourcesHome,
    wordsCountBUBBLE,
    getFeedbackSimplifiedHome,
    getInfoFeedbackHome,
    compareCols,
    compareMainKPI,
    getCountCols,
}

export default HomeService
