import apiService from './api/apiService';
import store from '../store';
import {
    setTopics,
    setDistribuzioneTopic,
    setDistribuzioneTopicPerSentiment,
    setDistribuzioneTopicPerData,
    setVotoMedioTopicPerData,
    setVotoMedioTopic,
    setCountTopic,
    setReviewsInfos,
    setAvgRating,
    setAvgSentiment,
    setDistribuzioneSentiment,
} from '../redux/AnalisiAvanzataState';
import {generateRandomColor, getNoCodeFromPlatfrom} from '../helpers/helpers';
import {getHeaders} from "./api/headers";

function getTopicFiltered(includeNotAnalysed, dispatch) {
    const body = {
        includeNotAnalysed
    }
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post('topic/getTopicFiltered', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    let data = res.data.data;
                    data.forEach((element, index) => {
                        element.chipFlag = false;
                        if (!element.color) {
                            element.color = generateRandomColor();
                        }
                    });
                    dispatch(setTopics(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getDistribuzioneTopic(allFilters,
                               code = getNoCodeFromPlatfrom(),
                               dispatch,
                               returnAnt) {

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
        idProducts: selectedProducts,
        returnAnt
    }

    return new Promise((resolve, reject) => {
        apiService.apiAnalAdvTopic
            .post('distribuzioneTopic', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setDistribuzioneTopic(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getDistribuzioneSentiment(allFilters,
                                   code = getNoCodeFromPlatfrom(),
                                   dispatch,
                                   returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
        idProducts: selectedProducts,
        returnAnt
    }
    return new Promise((resolve, reject) => {
        apiService.apiAnalysisGeneric
            .post('analisiGenerica/distribuzioneSentiment', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setDistribuzioneSentiment(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getDistSentiment(allFilters, columns = [], returnAnt = true, idSources) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate,
        endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        "code": getNoCodeFromPlatfrom(),
        customFilters,
        columns: columns,
        returnAnt: returnAnt
    }
    return apiService.apiAnalysisGeneric.post("analisiGenerica/distribuzioneSentiment", body, getHeaders())
}

function getDistTopicSentiment(allFilters, columns = [], idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        columns: columns,
        idProducts: selectedProducts
    };
    return apiService.apiAnalAdvTopic.post('distribuzioneTopicPerSentiment', body, getHeaders())
}

function getDistribuzioneTopicPerSentiment(allFilters, code, dispatch, returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
        idProducts: selectedProducts,
        returnAnt
    }
    return new Promise((resolve, reject) => {
        apiService.apiAnalAdvTopic
            .post('distribuzioneTopicPerSentiment', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setDistribuzioneTopicPerSentiment(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getDistribuzioneTopicPerData(allFilters, code, dispatch, returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
        idProducts: selectedProducts,
        returnAnt
    }
    return new Promise((resolve, reject) => {
        dispatch(setDistribuzioneTopicPerData(null));
        apiService.apiAnalAdvTopic
            .post('distribuzioneTopicPerData', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setDistribuzioneTopicPerData(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}


function distTopicPerData(allFilters, columns = undefined, returnAnt = false, idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idLocations: selectedLocation,
        idTopics: selectedTopics,
        columns: columns,
        returnAnt: returnAnt,
        idProducts: selectedProducts
    };
    return apiService.apiAnalAdvTopic.post('distribuzioneTopicPerData', body, getHeaders())
}

function getVotoMedioTopicPerData(allFilters, code, dispatch, returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;
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
        idProducts: selectedProducts,
        returnAnt
    }
    return new Promise((resolve, reject) => {
        dispatch(setVotoMedioTopicPerData(null));
        apiService.apiAnalAdvTopic
            .post('votoMedioTopicPerData', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setVotoMedioTopicPerData(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getVotoMedioTopic(allFilters, code, dispatch, returnAnt) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
        idProducts: selectedProducts,
        returnAnt
    }
    return new Promise((resolve, reject) => {
        dispatch(setVotoMedioTopic(null));
        apiService.apiAnalAdvTopic
            .post('votoMedioTopic', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setVotoMedioTopic(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getCountTopic(allFilters, code, dispatch) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('countTopic', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data;
                    dispatch(setCountTopic(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getReviewsInfos(allFilters, code, dispatch) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
    return new Promise((resolve, reject) => {
        apiService.apiFeedback
            .post('/getInfo', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data.data;
                    dispatch(setReviewsInfos(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getAvgRating(allFilters, code, dispatch) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('avgRating', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data;
                    dispatch(setAvgRating(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getAvgSentiment(allFilters, code, dispatch) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters, selectedProducts} = allFilters;

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
    return new Promise((resolve, reject) => {
        apiService.apiInfos
            .post('avgSentiment', body, getHeaders())
            .then((res) => {
                if (res.data) {
                    const data = res.data;
                    dispatch(setAvgSentiment(data));
                }
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
            });
    });
}

function getDistribuzioneVotiPerData( allFilters,
                                      code,
                                      returnAnt,
                                      colX,
                                      colY) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: selectedSource,
        startDate,
        endDate,
        groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code,
        topics: selectedTopics,
        returnAnt,
        colX,
        colY
    }
    return apiService.apiAnalysisGeneric
        .post('analisiGenerica/distValByDate', body, getHeaders())
}


function getDistVotiPerData(allFilters, columns = [], returnAnt = false, colX = undefined, colY = 'isDataFeedback', isMultiChoice = false, idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        // colX: colX,
        colY: colY,
        columns: columns,
        returnAnt: returnAnt,
        isMultiChoice: isMultiChoice
    }
    return apiService.apiAnalysisGeneric.post('analisiGenerica/distValByDate', body, getHeaders())
}


function getDistribuzioneNps(allFilters, columns = [], returnAnt = false, idSources = undefined) {

    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        columns: columns,
        returnAnt: returnAnt
    }
    return apiService.apiAnalysisGeneric.post('analisiGenerica/distribuzioneNps', body, getHeaders())
}


function npsTempo(allFilters, columns = [], returnAnt = false, colX = 'isNPS', idSources = undefined) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby, customFilters} = allFilters;

    const body = {
        idSources: idSources ? idSources : selectedSource,
        startDate: startDate,
        endDate: endDate,
        groupby: groupby,
        channels: selectedChannel,
        idLocations: selectedLocation,
        customFilters,
        code: getNoCodeFromPlatfrom(),
        idTopics: selectedTopics,
        colX: colX,
        columns: columns,
        returnAnt: returnAnt
    }
    return apiService.apiAnalysisGeneric.post('analisiGenerica/npsTempo', body, getHeaders())
}

function compareCols(allFilters, code = [0, 1, 2, 3]) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource} = allFilters;

    return apiService.apiAnalysisGeneric.post('analisiGenerica/compareCols', {
        'idSources': selectedSource,
        'channels': selectedChannel,
        'idLocations': selectedLocation,
        'idTopics': selectedTopics,
        'startDate': startDate,
        'endDate': endDate,
        'code': code,
        'groupby': 'locationName',
        'xAxes': 'sentOriginal',
        'xAxesType': 'percentage',
        'xAxesCond': {
            'value': 1,
        },
        'yAxes': 'rating',
        'yAxesCond': {},
        'yAxesType': 'average',
        'rAxes': '_id',
        'rAxesCond': {},
        'rAxesType': 'occurences',
    }, getHeaders());
}

function compareTrend(allFilters) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby} = allFilters;
    return apiService.apiAnalysisComp.post('analisiCompetitor/compareTrend', {
        'idSources': selectedSource,
        'channels': selectedChannel,
        'idLocations': selectedLocation,
        'idTopics': selectedTopics,
        'startDate': startDate,
        'endDate': endDate,
        'groupKey': 'competitorName',
        'groupby': groupby,
        'xAxes': 'date',
        'xAxesType': 'data_rating',
        'xAxesCond': {},
        'yAxes': 'groupDates',
        'yAxesCond': {},
        'yAxesType': 'meanByTime',
        'rAxes': null,
        'rAxesCond': {},
        'rAxesType': null,
        'returnAnt': true,
    }, getHeaders());
}

function compareTrendRecensioni(allFilters) {
    const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby} = allFilters;

    return apiService.apiAnalysisComp.post('analisiCompetitor/compareTrend', {
        'idSources': selectedSource,
        'channels': selectedChannel,
        'idLocations': selectedLocation,
        'idTopics': selectedTopics,
        'startDate': startDate,
        'endDate': endDate,
        'groupKey': 'competitorName',
        'groupby': groupby,
        'xAxes': 'date',
        'xAxesType': 'data_feedback',
        'xAxesCond': {},
        'yAxes': 'groupDates',
        'yAxesCond': {},
        'yAxesType': 'countByTime',
        'rAxes': null,
        'rAxesCond': {},
        'rAxesType': null,
        'returnAnt': true,
    }, getHeaders());
}

const AnalisiAvanzataService = {
    getTopicFiltered,
    getDistribuzioneTopic,
    getDistribuzioneTopicPerSentiment,
    getDistribuzioneTopicPerData,
    getVotoMedioTopicPerData,
    getVotoMedioTopic,
    getCountTopic,
    getReviewsInfos,
    getAvgRating,
    getAvgSentiment,
    getDistribuzioneSentiment,
    getDistribuzioneVotiPerData,
    compareCols,
    compareTrend,
    compareTrendRecensioni,
    getDistSentiment,
    getDistTopicSentiment,
    getDistVotiPerData,
    distTopicPerData,
    getDistribuzioneNps,
    npsTempo
};

export default AnalisiAvanzataService;
