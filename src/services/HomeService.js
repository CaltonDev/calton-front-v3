import apiService from "./api/apiService";
import {getNoCodeFromPlatfrom} from "../helpers/helpers";
import {getHeaders} from "./api/headers";

function getAverageByTime(allFilters, type, columnDateToGroup, nocode = getNoCodeFromPlatfrom(), columns = undefined, returnAnt= false, isMultiChoice = undefined, idSources) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        type,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        "code": nocode,
        idTopics: selectedTopics,
        customFilters,
        columns,
        returnAnt,
        isMultiChoice,
        idProducts: selectedProducts
    }
    return apiService.apiAnalysisStandard.post('getAverageByTime', body, getHeaders())
}

function getDistribuzioneVoti(allFilters, columnDateToGroup, columns=[], returnAnt=false, colX = undefined, compactValues, idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, customFilters} = allFilters;
    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        "code": getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt,
        colX: colX,
        idProducts: selectedProducts,
        compactValues
    }
    return apiService.apiAnalysisStandard.post('countSingleCol', body, getHeaders())
}

function getCountCols(allFilters, columnDateToGroup, columns=[], returnAnt=false, colX = undefined, isMultiChoice=false, idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        columnDateToGroup,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        "code": getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt,
        colX: colX,
        isMultiChoice: isMultiChoice
    }
    return apiService.apiAnalysisStandard.post('countCols', body, getHeaders())
}

function wordsCountBUBBLE(allFilters, numCommons, code = getNoCodeFromPlatfrom()) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, groupby, customFilters} = allFilters;
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
        idProducts: selectedProducts
    }
    return apiService.apiAnalysisStandard.post('wordCloud', body, getHeaders())
}

function distribuzioneRecensioniPerData(allFilters, nocode = undefined, columns=[], returnAnt= false, idSources) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        "code": nocode,
        customFilters,
        columns,
        returnAnt,
        idProducts: selectedProducts
    }
    return apiService.apiAnalysisStandard.post('ColPerData', body, getHeaders())
}

function getSourcesHome(
    allFilters,
    nocode = getNoCodeFromPlatfrom(),
    includeTypeformInfo= false,
    download= false,
    columnDateToGroup = null,
    returnAnt = true,
    fromHome = false,
    id = undefined
) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, groupby = null, customFilters} = allFilters;

    const body = {
        idSources: id ? id : selectedSource,
        "code": nocode,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        customFilters,
        download,
        "includeTypeformInfo": includeTypeformInfo,
        columnDateToGroup,
        groupby: null,
        idProducts: selectedProducts,
        returnAnt,
        fromHome
    }

    return apiService.apiSource.post('/getSourcesFiltered', body, getHeaders())
}

function getDistributionReccomandation(allFilters, colName = ['tipo_raccomandazione'], columnDateToGroup = 'Date', code, returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource} = allFilters;

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
        returnAnt
    }
    return apiService.apiAnalysisStandard.post('countColumn', body, getHeaders())
}

function getFeedbackSimplifiedHome(allFilters, wordSelected={}, code = getNoCodeFromPlatfrom(), simplified = true, returnAnt) {

    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, customFilters} = allFilters;

    const body = {
        "idSources": selectedSource,
        "code": code,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        sort: [{
            name: "data",
            direction: "desc"
        }],
        skip: 0,
        customFilters: wordSelected && wordSelected.sentiment ? [...customFilters,  {
            "_id": null,
            "collection": "feedback",
            "EP_config": null,
            "attribute": "sentiment",
            "selectedCustom": [
                parseInt(wordSelected.sentiment)
            ]
        }] :customFilters,
        download: undefined,
        typeDownload: undefined,
        limit: 5,
        simplified: simplified,
        returnAnt,
        returnFormatted: true,
        search: null,
        lemmas: wordSelected?.word || null,
        idProducts: selectedProducts
    }
    return apiService.apiFeedback.post('getFeedback', body, getHeaders())
}


function getInfoFeedbackHome(allFilters, wordSelected={}, code = getNoCodeFromPlatfrom(), simplified = true) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, customFilters} = allFilters;
    const body = {
        "idSources": selectedSource,
        "code": code,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        sort: [{
            name: "data",
            direction: "desc"
        }],
        skip: 0,
        customFilters: wordSelected && wordSelected.sentiment ? [...customFilters,  {
            "_id": null,
            "collection": "feedback",
            "EP_config": null,
            "attribute": "sentiment",
            "selectedCustom": [
                parseInt(wordSelected.sentiment)
            ]
        }] :customFilters,
        download: undefined,
        typeDownload: undefined,
        limit: 5,
        simplified: simplified,
        returnFormatted: true,
        search: null,
        lemmas: wordSelected?.word || null,
        idProducts: selectedProducts
    }
    return apiService.apiFeedback.post('getInfo', body, getHeaders())
}

function compareCols(allFilters) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource} = allFilters;

    return apiService.apiAnalysisComp.post('analisiCompetitor/compareCols', {
        "idSources": selectedSource,
        "channels": selectedChannel,
        "idLocations": selectedLocation,
        "idTopics": selectedTopics,
        "startDate": startDate,
        "endDate": endDate,
        "groupby": "competitorName",
        "xAxes": "sentOriginal",
        "xAxesType": "percentage",
        "xAxesCond": {
            "value": 1
        },
        "yAxes": "rating",
        "yAxesCond": {},
        "yAxesType": "average",
        "rAxes": "_id",
        "rAxesCond": {},
        "rAxesType": "occurences",
        "returnAnt": true,
        selectedProducts
    }, getHeaders())
}


function compareMainKPI(allFilters, returnSentiment= false) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource} = allFilters;

    return apiService.apiAnalysisComp.post('analisiCompetitor/compareMainKPI', {
        "idSources": selectedSource,
        "channels": selectedChannel,
        "idLocations": selectedLocation,
        "idTopics": selectedTopics,
        "startDate": startDate,
        "endDate": endDate,
        "groupKey": "competitorName",
        "returnSentiment": returnSentiment,
        selectedProducts
    }, getHeaders())
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
    getCountCols
}

export default HomeService
