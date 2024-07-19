/**
 * Helpers Functions
 */
import moment from 'moment'
import store from '../store/store'
import AppConfig from '../constants/AppConfig'
import wuzzy from 'wuzzy'
import { showToast } from '../store/toast/errorToastSlice'
import {
    popSocketMessage,
    pushSocketMessage,
    resetSocketMessage,
    setConsumeLocally,
} from '../store/socket/socketSlice'

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return (
            'rgba(' +
            [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
            ',' +
            alpha +
            ')'
        )
    }
    throw new Error('Bad Hex')
}

export function capitalizeWords(str) {
    const words = str.split(' ')
    const capitalizedWords = []

    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
        capitalizedWords.push(capitalizedWord)
    }

    return capitalizedWords.join(' ')
}

export function displayVariations(product) {
    if (!product?.variations || Object.keys(product.variations).length === 0) {
        return product['productName']
    }
    return displayVariationsFromObj(product.variations)
}

export function getSorter(element, type) {
    if (type === 'int') {
        return (a, b) => a[element.key] - b[element.key]
    }
    if (type === 'string') {
        return (a, b) => a[element.key]?.localeCompare(b[element.key])
    }
    if (type === 'date') {
        return (a, b) =>
            moment(a[element.key])?.unix() - moment(b[element.key]).unix()
    }
}

export function displayVariationsFromObj(obj) {
    const productNewName = []
    for (let key in obj) {
        const value = obj[key]
        productNewName.push(
            capitalizeWords(`${key.replace('_', ' ')}: ${value}`)
        )
    }

    return productNewName.join(' - ')
}

export function getNoCodeFromPlatfrom() {
    const platformType = store.getState()?.Settings.platformType
    return platformType === 'reviews'
        ? AppConfig.codesource
        : platformType === 'competitor'
          ? AppConfig.codecompetitor
          : platformType === 'listing'
            ? AppConfig.codelisting
            : AppConfig.codesurvey
}

export function getCodeOnlyCompetitors() {
    return AppConfig.codeonlycompetitor
}

export function getAllCode() {
    return AppConfig.codeonlycompetitor.concat(
        AppConfig.codesource,
        AppConfig.codelisting,
        AppConfig.codesurvey
    )
}

export function getCodeFromPlatfrom() {
    const platformType = store.getState()?.Settings.platformType
    return platformType === 'reviews'
        ? AppConfig.codesource
        : AppConfig.codesurvey
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100
    }
    if (ending == null) {
        ending = '...'
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
    } else {
        return str
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000
    let formatDate = format ? format : 'MM-DD-YYYY'
    return moment(time).format(formatDate)
}

/**
 * Convert Date To Timestamp
 */
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD'
    return moment(date, formatDate).unix()
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname
    let path = location.split('/')
    return path[1]
}

export async function chartToDataURI(element) {
    if (element.chart) {
        return element.chart.dataURI().then(({ imgURI }) => imgURI)
    } else if (element.chartInstance) {
        return element.chartInstance.toBase64Image()
    }
    throw Error('Unknown chart element')
}

export function downloadFile(file, filename) {
    const a = document.createElement('a')
    document.body.appendChild(a)
    const fileUrl = window.URL.createObjectURL(file)
    a.href = fileUrl
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(fileUrl)
    a.remove()
}

export function generateRandomColor() {
    return (
        '#' +
        Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
            .toUpperCase()
    )
}

export function searchHeader(search, items, setInsideState) {
    if (search && search !== '' && search !== ' ') {
        const tmpFonti = []
        for (const item of items) {
            for (const [key, value] of Object.entries(item)) {
                if (typeof value === 'string' || value instanceof String) {
                    const similarity = wuzzy.jaccard(
                        String(value)?.toLowerCase(),
                        search?.toLowerCase()?.trim()
                    )
                    if (
                        similarity >= 0.5 ||
                        String(value)
                            ?.toLowerCase()
                            .includes(search?.toLowerCase()?.trim())
                    ) {
                        const exist = tmpFonti?.find(
                            (elm) => elm?._id === item?._id
                        )
                        if (!exist) {
                            tmpFonti.push(item)
                        }
                    }
                }
            }
        }
        setInsideState(tmpFonti)
    } else {
        setInsideState(items)
    }
}

export function createTooltip(locationsName) {
    let titleList = []

    if (locationsName instanceof Array) {
        locationsName.map((listing) => {
            return titleList.push(listing)
        })
    }

    return titleList.join(', ')
}

export async function manageLocalToastWSAndReload(
    socketMessage,
    reloadData,
    dispatch,
    t,
    additionalCheckReload = true
) {
    const currData = popMessageFromSocket(socketMessage, dispatch)
    const remains = currData?.remains

    if (remains === 0 && additionalCheckReload && reloadData) {
        await reloadData()
        dispatch(resetSocketMessage())
        dispatch(setConsumeLocally(false))
    }
}

export async function manageLayoutToastWSAndReload(
    socketMessage,
    reloadData,
    dispatch,
    t
) {
    let currData = []
    if (socketMessage instanceof Array) {
        currData = socketMessage[0]
    }

    const tot = currData?.tot
    const error = currData?.error
    const remains = currData?.remains
    const idTask = currData?.idTask
    const done = currData?.done
    const message = `${t('Caricati')} ${done}/${tot} \n ${t('Errore')} ${error}/${tot}`

    if (remains === 0) {
        if (error === tot) {
            // all operations went wrong - Error message
            dispatch(
                showToast({
                    type: 6,
                    idTask: idTask,
                    pendingText: message,
                    position: 'top-right',
                })
            )
        } else if (error < tot && error > 0) {
            // at least one operation went wrong - Warning message
            dispatch(
                showToast({
                    type: 8,
                    idTask: idTask,
                    pendingText: message,
                    position: 'top-right',
                })
            )
        } else {
            // all operations went well - Success message
            dispatch(
                showToast({
                    type: 5,
                    idTask: idTask,
                    pendingText: message,
                    position: 'top-right',
                })
            )
        }

        dispatch(setConsumeLocally(true))
    } else {
        popMessageFromSocket(socketMessage, dispatch)
        dispatch(
            showToast({
                type: 4,
                idTask: idTask,
                pendingText: message,
                position: 'top-right',
            })
        )
    }
}

export function popMessageFromSocket(socketMessage, dispatch) {
    let currData = socketMessage
    if (socketMessage instanceof Array) {
        currData = socketMessage[0]
    }
    dispatch(popSocketMessage())
    return currData
}

export function formatTime(time) {
    if (time === null) return '00'
    if (time < 10) time = '0' + time

    return time
}

export function isWhiteSpaceString(str) {
    if (typeof str === 'string' || str instanceof String)
        return !str?.replace(/\s/g, '')?.length

    return false
}
