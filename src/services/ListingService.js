import apiService from "./api/apiService";
import {getHeaders} from "./api/headers";
import {getNoCodeFromPlatfrom} from "../helpers/helpers";

function getListings(limit, skip, listingsName = [], listingStateObj = {toVerify: null, pendingVerification: null, isDuplicated: null, missedStoreCode: null}) {
  const body = {"limit": limit, "skip": skip, "listingsName": listingsName, toVerify: listingStateObj?.toVerify, pendingVerification: listingStateObj?.pendingVerification, isDuplicated: listingStateObj?.isDuplicated, missedStoreCode: listingStateObj?.missedStoreCode}
  return apiService.apiListings.post('getListings', body, getHeaders())
}

function getNumberOfListings(listingsName = [], fromMenu = false, listingStateObj = {toVerify: null, pendingVerification: null, isDuplicated: null, missedStoreCode: null}) {
  const body = {"listingsName": listingsName, "fromMenu": fromMenu, toVerify: listingStateObj?.toVerify, pendingVerification: listingStateObj?.pendingVerification, isDuplicated: listingStateObj?.isDuplicated, missedStoreCode: listingStateObj?.missedStoreCode}
  return apiService.apiListings.post('getNumberOfListings', body, getHeaders())
}

function updateListing(listingsName, data, isInfoActivity = false, isInfoContact = false, isInfoLocation = false) {
  const body = {listingsName, data, isInfoActivity, isInfoContact, isInfoLocation}
  return apiService.apiListings.post('updateListing', body, getHeaders())
}

function createNewListing(body) {
  return apiService.apiListings.post('createListing', body, getHeaders())
}

function getCategoriesList(userInput) {
  const body = {
    filter: userInput
  }
  return apiService.apiListings.post('getCategoriesList', body, getHeaders())
}


function deleteListing(listingsName) {
  const body = {listingsName: listingsName}
  return apiService.apiListings.post('deleteListing', body, getHeaders())
}

function deleteDuplicateListing(listingsName) {
  const body = {listingsName: listingsName}
  return apiService.apiListings.post('deleteDuplicateListing', body, getHeaders())
}

function getMenus(code = getNoCodeFromPlatfrom(), listingsName, skip = 0, limit = 15, isSingle = false, isFilter = false) {
  const body = {
    code,
    listingsName,
    skip,
    limit,
    isSingle,
    isFilter
  }
  return apiService.apiListings.post('getMenus', body, getHeaders())
}

function getPhotos(listingsName, skip = 0, limit = 15, returnAnt = false, fromCustomers = false, sourcePhoto = null, nextPageToken = null) {
  const body = {
    listingsName,
    skip,
    limit,
    returnAnt,
    sourcePhoto,
    nextPageToken,
    fromCustomers
  }
  return apiService.apiListings.post('getPhotos', body, getHeaders())
}

function editHours(hours, listingsName = [], isRegular = true, isSpecial = false, isMore = false, isNotSpecified = false, isTemporarilyClosed = false, isPermanentlyClosed = false, toOverwrite = true) {
  const body = {hours, listingsName, isRegular, isSpecial, isMore, isNotSpecified, isTemporarilyClosed, isPermanentlyClosed, toOverwrite}
  return apiService.apiListings.post('editHours', body, getHeaders())
}

function getHours(listingsName = [], skip = 0, limit = 15, returnAnt = false, code = [6], isSingle = true, nextPageToken = null) {
  const body = {returnAnt, listingsName,  code, isSingle, skip, limit, nextPageToken}
  return apiService.apiListings.post('getHours', body, getHeaders())
}

function getSpecialHours(listingsName = [], code = [6], isSingle = true) {
  const body = {"listingsName": listingsName, 'code': code, 'isSingle': isSingle}
  return apiService.apiListings.post('getSpecialHours', body, getHeaders())
}

function getMoreHours(listingsName = [], code = [6], isSingle = true) {
  const body = {"listingsName": listingsName, 'code': code, 'isSingle': isSingle}
  return apiService.apiListings.post('getMoreHoursList', body, getHeaders())
}

function getPerformance(allFilters, listingsName, metric, code) {
  const {startDate, endDate, groupby} = allFilters
  const body = {"listingsName": listingsName, "metric": metric, startDate: startDate, endDate: endDate, groupby: groupby, code: code}
  return apiService.apiListings.post('getPerformance', body, getHeaders())
}

function getSearchKeywords(listingsName, startDate, endDate, groupBy, code) {
  const body = {"listingsName": listingsName, startDate: startDate, endDate: endDate, groupby: groupBy, code: code}
  return apiService.apiListings.post('getSearchKeywords', body, getHeaders())
}

function updateMenus(listingsName, menu) {
  const body = {
    "listingsName": listingsName,
    "menu": menu
  }
  return apiService.apiListings.post('updateMenus', body, getHeaders())
}

function uploadPhoto(listingsName, dataUrl, category, fromMenu = false, isCover = false, isProfile = false, isLogo = false, isPhoto = false) {
  let body = {}

  category = isCover ? "cover": isProfile ? "profile" : isLogo? "logo": category

  if (!isPhoto) {
    body = {
      "listingsName": listingsName,
      "url_img": dataUrl,
      "fromMenu": fromMenu,
      "locationAssociation": {
        "category": category
      }
    }
  } else if (isPhoto) {
    body = new FormData();
    body.append("input_name", dataUrl);
    body.append("info", JSON.stringify({
      "fromMenu": fromMenu,
      "listingsName": listingsName,
      "locationAssociation": {
        "category": category
      }
    }));

  }

  return apiService.apiListings.post('uploadPhoto', body, getHeaders())
}

function getAllLocations(accounts = [], nextPageToken = null) {
  const body = {
    accounts: [accounts],
    nextPageToken
  }
  return apiService.apiListings.post('getAllLocations', body, getHeaders())
}

function setAllLocations(locations, accounts = undefined, allLocations = undefined) {
  const body = {
    locations,
    accounts,
    allLocations
  }
  return apiService.apiListings.post('setAllLocations', body, getHeaders())
}

function createLocalPost(body) {
  return apiService.apiListings.post('createLocalPost', body, getHeaders())
}

function getMediaUrlLocalPost(body) {
  return apiService.apiListings.post('getMediaUrlLocalPost', body, getHeaders())
}

function getAllAccounts() {
  const body = {}
  return apiService.apiListings.post('getAllAccounts', body, getHeaders())
}

function fetchVerificationOptions(listingName, languageCode) {
  const body = {listing_name: listingName, language_code: languageCode}
  return apiService.apiListings.post('fetchVerificationOptions', body, getHeaders())
}

function verifyListing(listingName, verificationOption, data, languageCode) {
  const body = {listing_name: listingName, method: verificationOption?.verificationMethod, request_data: data, language_code: languageCode}

  return apiService.apiListings.post('verifyListing', body, getHeaders())
}

function completeListingVerification(listingName, pin) {
  const body = {listing_name: listingName, pin}
  return apiService.apiListings.post('completeListingVerification', body, getHeaders())
}

function getLocalPosts(listingsName = [], skip = 0, limit = 15, returnAnt = false, viewBy, nextPageToken = null, postsName = [], postsHash = [], returnLocations = false, startDate, endDate, fromCalendar = false) {
  const body = {returnAnt, listingsName, skip, limit, viewBy, nextPageToken, postsName, postsHash, returnLocations, startDate, endDate, fromCalendar}
  return apiService.apiListings.post('getLocalPostsFromDb', body, getHeaders())
}

function getNumberOfItems(listingsName = [], viewBy = "listing") {
  const body = {listingsName, viewBy}
  return apiService.apiListings.post('getNumberOfItems', body, getHeaders())
}

function getPostsGroupedByStatus(listingsName = [], skip = 0, limit = 10, status = "") {
  const body = {listingsName, skip, limit, status}
  return apiService.apiListings.post('getLocalPostsFromDb', body, getHeaders())
}

function getListingsFromPost(localPostName = "", skip = 0, limit = 15, returnAnt = false) {
  const body = {localPostName, skip, limit, returnAnt}
  return apiService.apiListings.post('getListingsFromPost', body, getHeaders())
}

function deleteLocalPost(localPostName) {
  const body = {localPostName}
  return apiService.apiListings.post('deleteLocalPost', body, getHeaders())
}

function updateLocalPost(postId, postData) {
  const body = {localPostName: [postId], data: postData}
  return apiService.apiListings.post('deleteLocalPost', body, getHeaders())
}

const ListingService = {
  getAllLocations,
  setAllLocations,
  getListings,
  getNumberOfListings,
  updateListing,
  getCategoriesList,
  getHours,
  getSpecialHours,
  getMoreHours,
  getPerformance,
  getSearchKeywords,
  getMenus,
  getPhotos,
  updateMenus,
  uploadPhoto,
  editHours,
  createLocalPost,
  getMediaUrlLocalPost,
  createNewListing,
  getAllAccounts,
  deleteListing,
  fetchVerificationOptions,
  verifyListing,
  completeListingVerification,
  deleteDuplicateListing,
  getLocalPosts,
  getNumberOfItems,
  getPostsGroupedByStatus,
  getListingsFromPost,
  deleteLocalPost,
  updateLocalPost
}

export default ListingService
