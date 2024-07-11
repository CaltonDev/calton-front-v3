import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function barChartCompetitor(allFilters) {
  const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource, groupby} = allFilters;

  return apiService.apiAnalysisAvaComp.post('/barChartCompetitor', {
    "idSources": selectedSource,
    "channels": selectedChannel,
    "idLocations": selectedLocation,
    "idTopics": selectedTopics,
    "startDate": startDate,
    "endDate": endDate,
    "groupKey": "competitorName",
    "groupby": groupby,
    "xAxes": "topics",
    "xAxesType": "list",
    "xAxesCond": {},
    "yAxes": "sentiment",
    "yAxesCond": {},
    "yAxesType": "count",
    "returnAnt": true
  }, getHeaders())
}
function distribuzioneTopic(allFilters, groupKey='topics', count='count', childrenKey= 'competitorName') {
  const {startDate, endDate, selectedLocation, selectedChannel, selectedTopics, selectedSource} = allFilters;

  return apiService.apiAnalysisAvaComp.post('/distribution', {
    "idSources": selectedSource,
    "channels": selectedChannel,
    "idLocations": selectedLocation,
    "idTopics": selectedTopics,
    "startDate": startDate,
    "endDate": endDate,
    "childrenKey": childrenKey,
    "groupKey": groupKey,
    "type": count
  }, getHeaders())
}

const AnalisiAvanzataCompetitorService = {
  barChartCompetitor,
  distribuzioneTopic
};

export default AnalisiAvanzataCompetitorService;
