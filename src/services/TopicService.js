import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";
import { setBestWorst } from '../redux/AnalisiAvanzataState';

function getTopicFiltered(returnAnt) {
    const body = {
        returnAnt
    }
    return apiService.apiTopic.post('getTopicFiltered', body, getHeaders())
}

function addTopic(_id,
                  sources_excluded,
                  name,
                  words,
                  opLogical,
                  color) {
    const body = {
        _id,
        sources_excluded,
        name,
        words,
        opLogical,
        color
    }
    return apiService.apiTopic.post('add', body, getHeaders())
}

function editTopic(_id,
                   sources_excluded,
                   name,
                   words,
                   opLogical,
                   color) {
    const body = {
        _id,
        sources_excluded,
        name,
        words,
        opLogical,
        color
    }
    return apiService.apiTopic.post('handleTopicChange', body, getHeaders())
}

function processTopic(_id) {
    const body = {
        _id
    }
    return apiService.apiTopic.post('process', body, getHeaders())
}

function removeTopic(_id) {
    const body = {
        _id
    }
    return apiService.apiTopic.post('removeTopic', body, getHeaders())
}

function distribuzioneTopicPerData(
    idSources,
    startDate,
    endDate,
    groupby,
    channels,
    idLocations,
    code,
    idTopics,
    idProducts
) {
    const body = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts
    }
    return apiService.apiAnalAdvTopic.post('distribuzioneTopicPerData', body, getHeaders())
}

function votoMedioTopicPerData(idSources,
                               startDate,
                               endDate,
                               groupby,
                               channels,
                               idLocations,
                               code,
                               idTopics,
                               idProducts) {
    const body = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts
    }
    return apiService.apiAnalAdvTopic.post('votoMedioTopicPerData', body, getHeaders())
}

function votoMedioTopic(idSources,
                        startDate,
                        endDate,
                        groupby,
                        channels,
                        idLocations,
                        code,
                        idTopics,
                        idProducts) {
    const body = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts
    }
    return apiService.apiAnalAdvTopic.post('votoMedioTopic', body, getHeaders())
}

function distribuzioneTopicPerSentiment(idSources,
                                        startDate,
                                        endDate,
                                        groupby,
                                        channels,
                                        idLocations,
                                        code,
                                        idTopics,
                                        idProducts) {
    const body = {
        idSources,
        startDate,
        endDate,
        groupby,
        channels,
        idLocations,
        code,
        idTopics,
        idProducts
    }
    return apiService.apiAnalAdvTopic.post('distribuzioneTopicPerSentiment', body, getHeaders())
}

function sentTopAndWorst(allFilters,
                         code,
                         dispatch
) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedProducts, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        customFilters,
        code,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        idProducts: selectedProducts
    }
    // return apiService.apiAnalAdvTopic.post('sentTopAndWorst', body, getHeaders())
    return new Promise((resolve, reject) => {
        dispatch(setBestWorst(null));
        apiService.apiAnalAdvTopic
            .post('sentTopAndWorst', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data;
                    dispatch(setBestWorst(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function handleTopicToFeedback(
    idFeedback,
    allTopic
) {
    const body = {
        idFeedback,
        allTopic
    }
    return apiService.apiTopic.post('handleTopicToFeedback', body, getHeaders())
}

const TopicService = {
    getTopicFiltered,
    addTopic,
    editTopic,
    processTopic,
    removeTopic,
    distribuzioneTopicPerData,
    votoMedioTopicPerData,
    votoMedioTopic,
    distribuzioneTopicPerSentiment,
    sentTopAndWorst,
    handleTopicToFeedback
}

export default TopicService
