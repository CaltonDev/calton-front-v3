import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";


function getLinguisticSetup(chartName, returnAnt = false) {
  const body = {
    chartName,
    returnAnt
  }
  return apiService.apiUrl.post('setupAnalysis/getLinguisticSetup', body, getHeaders())
}

function editLinguisticSetup(chartName, fieldType, rootWord, words, idSynonym = "") {
  const body = {
    chartName,
    fieldType,
    rootWord,
    words,
    idSynonym
  }
  return apiService.apiUrl.post('setupAnalysis/editLinguisticSetup', body, getHeaders())
}

function removeSingleLinguisticSetup(chartName, fieldType, rootWord, idSynonym = "") {
  const body = {
    chartName,
    fieldType,
    rootWord,
    idSynonym
  }
  return apiService.apiUrl.post('setupAnalysis/removeSingleLinguisticSetup', body, getHeaders())
}

const AnalysisService = {
  getLinguisticSetup,
  editLinguisticSetup,
  removeSingleLinguisticSetup
}

export default AnalysisService
