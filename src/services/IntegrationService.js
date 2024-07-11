import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";

function getIntegrations(code) {
  return apiService.apiUrl.post("integration/getIntegrations", {code}, getHeaders());
}

function searchTrustpilot(param) {
  return apiService.trustpilotApi.get("search/"+ param , getHeaders());
}

function IntegrationsFileUpload(body) {
  return new Promise((resolve, reject) => {
    apiService.apiUrl
      .post("source/upload", body, getHeaders())
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

const IntegrationService = {
  getIntegrations,
  IntegrationsFileUpload,
  searchTrustpilot
};

export default IntegrationService;
