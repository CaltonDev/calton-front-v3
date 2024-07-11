import apiService from "./api/apiService";
import store from "../store";
import {setSurveyData} from "../redux/SourcesFiltered";
import {getHeaders} from "./api/headers";

function getSourcesFiltered(code, fromSurveyTab) {
    const body = {
        code,
        fromSurveyTab
    }
    return apiService.apiUrl.post("source/getSourcesFiltered", body, {
        headers: {
            Authorization: store.getState()?.user?.data?.user?.token,
        },
    });
}

function getAllSources(code, returnAnt) {
    const body = {
        code,
        returnAnt
    }
    return apiService.apiSource.post('/getSourcesFiltered', body, {
        headers: {
            Authorization: store.getState()?.user?.data?.user?.token,
        },
    });
}

function removeSource(_id,
                      isSurvey,
                      typeformID) {
    const body = {
        _id,
        isSurvey,
        typeformID
    }
    return new Promise((resolve, reject) => {
        apiService.apiSource
            .post("removeSource", body, {
                headers: {
                    Authorization: store.getState()?.user?.data?.user?.token,
                },
            })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

function addEmptySurvey(name,
                        totalFeedback,
                        locationID,
                        formatted_address,
                        googlePlaceID,
                        from,
                        code) {
    const body = {
        name,
        totalFeedback,
        locationID,
        formatted_address,
        googlePlaceID,
        from,
        code
    }
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .post("source/addEmptySurvey", body, getHeaders())
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
}



function duplicateSurvey(
    formId,
    name,
    totalFeedback,
    locationID,
    formatted_address,
    googlePlaceID,
    from,
    code
) {
    const body = {
        formId,
        name,
        totalFeedback,
        locationID,
        formatted_address,
        googlePlaceID,
        from,
        code
    }
    return apiService.apiUrl.post('source/duplicateSurvey', body, getHeaders())
}

function getSurveysTP(typeformID, dispatch) {
    const body = {
        typeformID
    }
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .get(`surveysTP/forms/${body?.typeformID}`, body, getHeaders())
            .then((res) => {
                let data = res?.data;
                dispatch(setSurveyData(data));
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
}

function manageQuestion(body, dispatch) {
    return new Promise((resolve, reject) => {
        apiService.apiUrl
            .put(`surveysTP/forms`, body, getHeaders())
            .then((res) => {
                let data = res?.data;
                dispatch(setSurveyData(data));
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            });
    });
}


const SourcesService = {
    getSourcesFiltered,
    getAllSources,
    removeSource,
    addEmptySurvey,
    getSurveysTP,
    manageQuestion,
    duplicateSurvey
};

export default SourcesService;
