import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface SendReportBody {
    groupId: string
    selectedLocations: string[]
    compareWith: string[]
    multiple: boolean
    startDate: string
    endDate: string
    idPeriodic: string
    period: string
    customFilters: any[]
    groupMailList: string[]
    groupLocations: string[]
}

interface RemoveGroupReportBody {
    _id: string
}

interface AddGroupReportBody {
    groupName: string
    selectedLocations: string[]
    emailsArr: string[]
    _id: string
}

interface AddReportToGroupBody {
    _id: string
    selectedLocations: string[]
    frequency: string
    compareWith: string[]
    sendTime: string
    reportName: string
    multiple: boolean
    customFilters: any[]
}

interface EditGroupReportBody {
    groupName: string
    selectedLocations: string[]
    emailsArr: string[]
    _id: string
}

interface EditReportBody {
    groupId: string
    idPeriodic: string
    selectedLocations: string[]
    frequency: string
    compareWith: string[]
    sendTime: string
    reportName: string
    multiple: boolean
    customFilters: any[]
}

interface RemoveReportBody {
    idGroup: string
    _id: string
}

function getAllGroups() {
    return apiService.apiUrl.post('/reportGroup/getAllGroups', {}, getHeaders())
}

function getAllReports() {
    return apiService.apiUrl.post(
        '/reportGroup/getAllReports',
        {},
        getHeaders()
    )
}

function sendReport(body: SendReportBody) {
    return apiService.apiReport.post('/sendReport', body, getHeaders())
}

function removeGroupReport(body: RemoveGroupReportBody) {
    return apiService.apiUrl.post('/reportGroup/remove', body, getHeaders())
}

function addGroupReport(body: AddGroupReportBody) {
    return apiService.apiUrl.post('/reportGroup/add', body, getHeaders())
}

function addReportToGroup(body: AddReportToGroupBody) {
    return apiService.apiUrl.post(
        '/reportGroup/addPeriodic',
        body,
        getHeaders()
    )
}

function editGroupReport(body: EditGroupReportBody) {
    return apiService.apiUrl.post('/reportGroup/edit', body, getHeaders())
}

function editReport(body: EditReportBody) {
    return apiService.apiUrl.post('/reportGroup/editReport', body, getHeaders())
}

function removeReport(body: RemoveReportBody) {
    return apiService.apiUrl.post(
        '/reportGroup/removeReport',
        body,
        getHeaders()
    )
}

const ReportService = {
    getAllGroups,
    getAllReports,
    sendReport,
    removeGroupReport,
    addGroupReport,
    editGroupReport,
    removeReport,
    addReportToGroup,
    editReport,
}

export default ReportService
