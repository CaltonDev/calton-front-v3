import apiService from './api/apiService'
import { getHeaders } from './api/headers'
import { getNoCodeFromPlatfrom } from '../helpers/helpers'
import { useQuery, useQueryClient } from 'react-query'
import { prefetchNextPage } from '../helpers/reactQueryHelpers'

export interface ListingServiceBody {
    limit?: number
    skip?: number
    listingsName?: any[]
    listingStateObj?: {
        toVerify?: any
        pendingVerification?: any
        isDuplicated?: any
        missedStoreCode?: any
    }
    data?: any
    isInfoActivity?: boolean
    isInfoContact?: boolean
    isInfoLocation?: boolean
    fromMenu?: boolean
    sourcePhoto?: any
    nextPageToken?: string | null
    fromCustomers?: boolean
    code?: any[]
    isSingle?: boolean
    isFilter?: boolean
    filter?: any
    hours?: any
    isRegular?: boolean
    isSpecial?: boolean
    isMore?: boolean
    isNotSpecified?: boolean
    isTemporarilyClosed?: boolean
    isPermanentlyClosed?: boolean
    toOverwrite?: boolean
    metric?: any
    startDate?: any
    endDate?: any
    groupby?: any
    userInput?: any
    menu?: any
    accounts?: any[]
    allLocations?: any
    locations?: any
    body?: any // Adjust as per your specific structure
    postsName?: any[]
    postsHash?: any[]
    returnLocations?: boolean
    localPostName?: any
    viewBy?: any
    postId?: any
    postData?: any
    listing_name?: any
    language_code?: any
    method?: any
    request_data?: any
    pin?: any
    returnAnt?: boolean
    status?: string
    fromCalendar?: boolean
    url_img?: string
    locationAssociation?: {
        category?: string
    }
    totalNumberOfRecords?: number
    isPrefetchNextPage?: boolean
}

function getListings(
    limit: number,
    skip: number,
    listingsName: any[] = [],
    listingStateObj: ListingServiceBody['listingStateObj'] = {
        toVerify: null,
        pendingVerification: null,
        isDuplicated: null,
        missedStoreCode: null,
    }
) {
    const body: ListingServiceBody = {
        limit,
        skip,
        listingsName,
        listingStateObj,
    }
    return apiService.apiListings.post('/getListings', body, getHeaders())
}

function getNumberOfListings(
    listingsName: any[] = [],
    fromMenu = false,
    listingStateObj: ListingServiceBody['listingStateObj'] = {
        toVerify: null,
        pendingVerification: null,
        isDuplicated: null,
        missedStoreCode: null,
    }
) {
    const body: ListingServiceBody = {
        listingsName,
        fromMenu,
        listingStateObj,
    }
    return apiService.apiListings.post(
        '/getNumberOfListings',
        body,
        getHeaders()
    )
}

function getCountOfListings(
    listingsName: any[] = [],
    listingStateObj: ListingServiceBody['listingStateObj'] = {
        toVerify: null,
        pendingVerification: null,
        isDuplicated: null,
        missedStoreCode: null,
    }
) {
    const body: ListingServiceBody = {
        listingsName,
        listingStateObj,
    }
    return useQuery<any, Error>(
        ['countOfListings', body],
        () =>
            apiService.apiListings.post(
                '/getNumberOfListings',
                body,
                getHeaders()
            ),
        {
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )
}

function updateListing(
    listingsName: any[],
    data: any,
    isInfoActivity = false,
    isInfoContact = false,
    isInfoLocation = false
) {
    const body: ListingServiceBody = {
        listingsName,
        data,
        isInfoActivity,
        isInfoContact,
        isInfoLocation,
    }
    return apiService.apiListings.post('/updateListing', body, getHeaders())
}

function createNewListing(body: ListingServiceBody['body']) {
    return apiService.apiListings.post('/createListing', body, getHeaders())
}

function getCategoriesList(userInput: any) {
    const body: ListingServiceBody = {
        filter: userInput,
    }
    return apiService.apiListings.post('/getCategoriesList', body, getHeaders())
}

function deleteListing(listingsName: any[]) {
    const body: ListingServiceBody = {
        listingsName,
    }
    return apiService.apiListings.post('/deleteListing', body, getHeaders())
}

function deleteDuplicateListing(listingsName: any[]) {
    const body: ListingServiceBody = {
        listingsName,
    }
    return apiService.apiListings.post(
        '/deleteDuplicateListing',
        body,
        getHeaders()
    )
}

function getMenus(
    code: any[] = getNoCodeFromPlatfrom(),
    listingsName: any,
    skip = 0,
    limit = 15,
    isSingle = false,
    isFilter = false
) {
    const body: ListingServiceBody = {
        code,
        listingsName,
        skip,
        limit,
        isSingle,
        isFilter,
    }
    return apiService.apiListings.post('/getMenus', body, getHeaders())
}

function getPhotos(
    listingsName: any,
    skip = 0,
    limit = 15,
    returnAnt = false,
    fromCustomers = false,
    sourcePhoto = null,
    nextPageToken = null
) {
    const body: ListingServiceBody = {
        listingsName,
        skip,
        limit,
        returnAnt,
        sourcePhoto,
        nextPageToken,
        fromCustomers,
    }
    return apiService.apiListings.post('/getPhotos', body, getHeaders())
}

function editHours(
    hours: any,
    listingsName: any[] = [],
    isRegular = true,
    isSpecial = false,
    isMore = false,
    isNotSpecified = false,
    isTemporarilyClosed = false,
    isPermanentlyClosed = false,
    toOverwrite = true
) {
    const body: ListingServiceBody = {
        hours,
        listingsName,
        isRegular,
        isSpecial,
        isMore,
        isNotSpecified,
        isTemporarilyClosed,
        isPermanentlyClosed,
        toOverwrite,
    }
    return apiService.apiListings.post('/editHours', body, getHeaders())
}

function getHours({
    listingsName = [],
    skip = 0,
    limit = 10,
    returnAnt = false,
    code = [6],
    isSingle = true,
    nextPageToken = null,
    totalNumberOfRecords = 0,
    isPrefetchNextPage = false,
}: ListingServiceBody) {
    const body: ListingServiceBody = {
        listingsName,
        skip,
        limit,
        returnAnt,
        code,
        isSingle,
        nextPageToken,
    }
    const queryResult = useQuery<any, Error>(
        ['hours', body],
        () => apiService.apiListings.post('/getHours', body, getHeaders()),
        {
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )

    if (isPrefetchNextPage) {
        prefetchNextPage({
            queryKey: 'hours',
            endpoint: 'getHours',
            body,
            skip,
            limit,
            totalNumberOfRecords,
            staleTime: 5 * 60 * 1000,
        })
    }

    return queryResult
}

function getSpecialHours(
    listingsName: any[] = [],
    code: any[] = [6],
    isSingle = true
) {
    const body: ListingServiceBody = {
        listingsName,
        code,
        isSingle,
    }
    return apiService.apiListings.post('/getSpecialHours', body, getHeaders())
}

function getMoreHours(
    listingsName: any[] = [],
    code: any[] = [6],
    isSingle = true
) {
    const body: ListingServiceBody = {
        listingsName,
        code,
        isSingle,
    }
    return apiService.apiListings.post('/getMoreHoursList', body, getHeaders())
}

function getPerformance(
    allFilters: any,
    listingsName: any,
    metric: any,
    code: any
) {
    const { startDate, endDate, groupby } = allFilters
    const body: ListingServiceBody = {
        listingsName,
        metric,
        startDate,
        endDate,
        groupby,
        code,
    }
    return apiService.apiListings.post('/getPerformance', body, getHeaders())
}

function getSearchKeywords(
    listingsName: any,
    startDate: any,
    endDate: any,
    groupBy: any,
    code: any
) {
    const body: ListingServiceBody = {
        listingsName,
        startDate,
        endDate,
        groupby: groupBy,
        code,
    }
    return apiService.apiListings.post('/getSearchKeywords', body, getHeaders())
}

function updateMenus(listingsName: any, menu: any) {
    const body: ListingServiceBody = {
        listingsName,
        menu,
    }
    return apiService.apiListings.post('/updateMenus', body, getHeaders())
}

function uploadPhoto(
    listingsName: any,
    dataUrl: any,
    category: any,
    fromMenu = false,
    isCover = false,
    isProfile = false,
    isLogo = false,
    isPhoto = false
) {
    let body: ListingServiceBody | FormData = {}

    category = isCover
        ? 'cover'
        : isProfile
          ? 'profile'
          : isLogo
            ? 'logo'
            : category

    if (!isPhoto) {
        body = {
            listingsName,
            url_img: dataUrl,
            fromMenu,
            locationAssociation: {
                category,
            },
        }
    } else if (isPhoto) {
        body = new FormData()
        body.append('input_name', dataUrl)
        body.append(
            'info',
            JSON.stringify({
                fromMenu,
                listingsName,
                locationAssociation: {
                    category,
                },
            })
        )
    }

    return apiService.apiListings.post('/uploadPhoto', body, getHeaders())
}

function getAllLocations(accounts: any[] = [], nextPageToken: any = null) {
    const body: ListingServiceBody = {
        accounts: [accounts],
        nextPageToken,
    }
    return apiService.apiListings.post('/getAllLocations', body, getHeaders())
}

function setAllLocations(
    locations: any,
    accounts: any[] | undefined = undefined,
    allLocations: any | undefined = undefined
) {
    const body: ListingServiceBody = {
        locations,
        accounts,
        allLocations,
    }
    return apiService.apiListings.post('/setAllLocations', body, getHeaders())
}

function createLocalPost(body: ListingServiceBody['body']) {
    return apiService.apiListings.post('/createLocalPost', body, getHeaders())
}

function getMediaUrlLocalPost(body: ListingServiceBody['body']) {
    return apiService.apiListings.post(
        '/getMediaUrlLocalPost',
        body,
        getHeaders()
    )
}

function getAllAccounts() {
    const body: ListingServiceBody = {}
    return useQuery<any, Error>(
        ['allUsersAccounts'],
        () =>
            apiService.apiListings.post('/getAllAccounts', body, getHeaders()),
        {
            staleTime: 0,
        }
    )
}

function fetchVerificationOptions(listingName: any, languageCode: any) {
    const body: ListingServiceBody = {
        listing_name: listingName,
        language_code: languageCode,
    }
    return apiService.apiListings.post(
        '/fetchVerificationOptions',
        body,
        getHeaders()
    )
}

function verifyListing(
    listingName: any,
    verificationOption: any,
    data: any,
    languageCode: any
) {
    const body: ListingServiceBody = {
        listing_name: listingName,
        method: verificationOption?.verificationMethod,
        request_data: data,
        language_code: languageCode,
    }
    return apiService.apiListings.post('/verifyListing', body, getHeaders())
}

function completeListingVerification(listingName: any, pin: any) {
    const body: ListingServiceBody = {
        listing_name: listingName,
        pin,
    }
    return apiService.apiListings.post(
        '/completeListingVerification',
        body,
        getHeaders()
    )
}

function getLocalPosts({
    viewBy = 'listing',
    listingsName = [],
    skip = 0,
    limit = 10,
    returnAnt = false,
    nextPageToken = null,
    postsName = [],
    postsHash = [],
    returnLocations = false,
    startDate,
    endDate,
    fromCalendar = false,
    totalNumberOfRecords = 0,
    isPrefetchNextPage = false,
}: ListingServiceBody) {
    const body: ListingServiceBody = {
        viewBy,
        listingsName,
        skip,
        limit,
        returnAnt,
        nextPageToken,
        postsName,
        postsHash,
        returnLocations,
        startDate,
        endDate,
        fromCalendar,
    }
    const queryResult = useQuery<any, Error>(
        ['localPosts', body],
        () =>
            apiService.apiListings.post(
                '/getLocalPostsFromDb',
                body,
                getHeaders()
            ),
        {
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )

    if (isPrefetchNextPage) {
        prefetchNextPage({
            queryKey: 'localPosts',
            endpoint: 'getLocalPostsFromDb',
            body,
            skip,
            limit,
            totalNumberOfRecords,
            staleTime: 5 * 60 * 1000,
        })
    }

    return queryResult
}

function getNumberOfItems(listingsName: any[] = [], viewBy = 'listing') {
    const body: ListingServiceBody = {
        listingsName,
        viewBy,
    }
    return apiService.apiListings.post('/getNumberOfItems', body, getHeaders())
}

function getCountOfItems({
    listingsName = [],
    viewBy = 'listing',
}: ListingServiceBody) {
    const body: ListingServiceBody = {
        listingsName,
        viewBy,
    }
    return useQuery<any, Error>(
        ['countOfItems', body],
        () =>
            apiService.apiListings.post(
                '/getNumberOfItems',
                body,
                getHeaders()
            ),
        {
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )
}

function getPostsGroupedByStatus(
    listingsName: any[] = [],
    skip = 0,
    limit = 10,
    status = ''
) {
    const body: ListingServiceBody = {
        listingsName,
        skip,
        limit,
        status,
    }
    return apiService.apiListings.post(
        '/getLocalPostsFromDb',
        body,
        getHeaders()
    )
}

function getListingsFromPost(
    localPostName = '',
    skip = 0,
    limit = 15,
    returnAnt = false
) {
    const body: ListingServiceBody = {
        localPostName,
        skip,
        limit,
        returnAnt,
    }
    return apiService.apiListings.post(
        '/getListingsFromPost',
        body,
        getHeaders()
    )
}

function deleteLocalPost(localPostName: any) {
    const body: ListingServiceBody = {
        localPostName,
    }
    return apiService.apiListings.post('/deleteLocalPost', body, getHeaders())
}

function updateLocalPost(postId: any, postData: any) {
    const body: ListingServiceBody = {
        localPostName: [postId],
        data: postData,
    }
    return apiService.apiListings.post('/updateLocalPost', body, getHeaders())
}

const ListingService = {
    getAllLocations,
    setAllLocations,
    getListings,
    getNumberOfListings,
    getCountOfListings,
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
    getCountOfItems,
    getPostsGroupedByStatus,
    getListingsFromPost,
    deleteLocalPost,
    updateLocalPost,
}

export default ListingService
