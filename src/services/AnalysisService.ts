import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface LinguisticSetupBody {
    chartName: string
    fieldType?: string
    rootWord?: string
    words?: string[]
    idSynonym?: string
    returnAnt?: boolean
}

function getLinguisticSetup(
    chartName: string,
    returnAnt = false
): Promise<any> {
    const body: LinguisticSetupBody = {
        chartName,
        returnAnt,
    }
    return apiService.apiUrl.post(
        '/setupAnalysis/getLinguisticSetup',
        body,
        getHeaders()
    )
}

function editLinguisticSetup(
    chartName: string,
    fieldType: string,
    rootWord: string,
    words: string[],
    idSynonym = ''
): Promise<any> {
    const body: LinguisticSetupBody = {
        chartName,
        fieldType,
        rootWord,
        words,
        idSynonym,
    }
    return apiService.apiUrl.post(
        '/setupAnalysis/editLinguisticSetup',
        body,
        getHeaders()
    )
}

function removeSingleLinguisticSetup(
    chartName: string,
    fieldType: string,
    rootWord: string,
    idSynonym = ''
): Promise<any> {
    const body: LinguisticSetupBody = {
        chartName,
        fieldType,
        rootWord,
        idSynonym,
    }
    return apiService.apiUrl.post(
        '/setupAnalysis/removeSingleLinguisticSetup',
        body,
        getHeaders()
    )
}

const AnalysisService = {
    getLinguisticSetup,
    editLinguisticSetup,
    removeSingleLinguisticSetup,
}

export default AnalysisService
