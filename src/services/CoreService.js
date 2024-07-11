import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";


function runCore(idSource) {
    const body = {
        idSource
    }
    return apiService.startCore.post('startCore', body, getHeaders())
}

const CoreService = {
    runCore
}

export default CoreService
