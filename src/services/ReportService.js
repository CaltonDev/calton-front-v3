import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getAllGroups() {
    return apiService.apiUrl.post('reportGroup/getAllGroups', {}, getHeaders())
}

function getAllReports() {
    return apiService.apiUrl.post('reportGroup/getAllReports', {}, getHeaders())
}

function sendReport(groupId,
                    selectedLocations,
                    compareWith,
                    multiple,
                    startDate,
                    endDate,
                    idPeriodic,
                    period,
                    customFilters,
                    groupMailList,
                    groupLocations
) {
    const body = {
        groupId,
        selectedLocations,
        compareWith,
        multiple,
        startDate,
        endDate,
        idPeriodic,
        period,
        customFilters,
        groupMailList,
        groupLocations
    }
    return apiService.apiReport.post('sendReport', body, getHeaders())
}

function removeGroupReport(_id) {
    const body = {
        _id
    }
    return apiService.apiUrl.post('reportGroup/remove', body, getHeaders())
}

function addGroupReport(groupName,
                        selectedLocations,
                        emailsArr,
                        _id
) {
    const body = {
        groupName,
        selectedLocations,
        emailsArr,
        _id
    }
    return apiService.apiUrl.post('reportGroup/add', body, getHeaders())
}

function addReportToGroup(
    _id,
    selectedLocations,
    frequency,
    compareWith,
    sendTime,
    reportName,
    multiple,
    customFilters) {

    const body = {
        _id,
        selectedLocations,
        frequency,
        compareWith,
        sendTime,
        reportName,
        multiple,
        customFilters
    }
    return apiService.apiUrl.post('reportGroup/addPeriodic', body, getHeaders())
}

function editGroupReport(groupName,
                         selectedLocations,
                         emailsArr,
                         _id) {
    const body = {
        groupName,
        selectedLocations,
        emailsArr,
        _id
    }
    return apiService.apiUrl.post('reportGroup/edit', body, getHeaders())
}

function editReport(groupId,
                    idPeriodic,
                    selectedLocations,
                    frequency,
                    compareWith,
                    sendTime,
                    reportName,
                    multiple,
                    customFilters) {

    const body = {
        groupId,
        idPeriodic,
        selectedLocations,
        frequency,
        compareWith,
        sendTime,
        reportName,
        multiple,
        customFilters
    }
    return apiService.apiUrl.post('reportGroup/editReport', body, getHeaders())
}

function removeReport(idGroup, _id) {
    const body = {
        idGroup,
        _id
    }
    return apiService.apiUrl.post('reportGroup/removeReport', body, getHeaders())
}


const ReportService = {
    getAllGroups,
    sendReport,
    removeGroupReport,
    addGroupReport,
    editGroupReport,
    removeReport,
    getAllReports,
    addReportToGroup,
    editReport
}

export default ReportService
