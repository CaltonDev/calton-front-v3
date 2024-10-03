export function handleAddingMoreTimeInterval(
    weekday,
    index,
    distinctPeriod,
    setDistinctPeriod
) {
    const newPeriod = {
        openDay: weekday,
        closeDay: weekday,
        openTime: {
            hours: null,
            minutes: null,
        },
        closeTime: {
            hours: null,
            minutes: null,
        },
    }

    let tmp = JSON.parse(JSON.stringify(distinctPeriod))

    tmp.moreHours[index].periods.push(newPeriod)

    setDistinctPeriod(tmp)
}

export function handleDeleteMoreHoursTimeInterval(
    weekday,
    periodIndex,
    hourIndex,
    distinctPeriod,
    setDistinctPeriod
) {
    let tmp = JSON.parse(JSON.stringify(distinctPeriod))

    tmp?.moreHours[periodIndex]?.periods.splice(hourIndex, 1)

    setDistinctPeriod(tmp)
}

export function handleAddingSpecialTimeInterval(
    startDate,
    endDate,
    specialPeriods,
    setSpecialPeriods,
    index
) {
    let tmpPeriod = [...specialPeriods]
    tmpPeriod[index].hours.push({
        openTime: {
            hours: null,
            minutes: null,
        },
        closeTime: {
            hours: null,
            minutes: null,
        },
    })

    setSpecialPeriods(tmpPeriod)
}
export function handleAddingTimeInterval(weekday, setListing) {
    const newPeriod = {
        openHours: null,
        openMinutes: null,
        closeHours: null,
        closeMinutes: null,
    }

    setListing((prevListing) => {
        let prev = { ...prevListing }
        if (!prevListing[weekday]) {
            prev[weekday] = []
        }
        const listing = {
            ...prev,
            [weekday]: [...prev[weekday], newPeriod],
        }
        return listing
    })
}

export function handleAddingMoreHoursTimeInterval(
    weekday,
    listing,
    setListing
) {
    const newPeriod = {
        openHours: null,
        openMinutes: null,
        closeHours: null,
        closeMinutes: null,
    }

    setListing((prevListing) => ({
        ...prevListing,
        [weekday]: [...prevListing[weekday], newPeriod],
    }))
}

export function handleDeleteTimeInterval(
    weekday,
    startTime,
    endTime,
    index,
    setListing,
    listing
) {
    let currentList = JSON.parse(JSON.stringify(listing))
    currentList[weekday].splice(index, 1)
    setListing(currentList)
}

export function handleDeleteSpecialTimeInterval(
    hourIndex,
    periodIndex,
    specialPeriods,
    setSpecialPeriods
) {
    let tmpPeriod = [...specialPeriods]
    tmpPeriod[periodIndex].hours.splice(hourIndex, 1)
    setSpecialPeriods(tmpPeriod)
}

export function formatDataValue(hours, minutes) {
    if (hours === null && minutes === null) return '00:00:00'
    if (hours < 10) hours = '0' + hours

    if (minutes < 10) minutes = '0' + minutes

    return hours + ':' + minutes + ':00'
}

export function formatDateDayJs(year, month, day) {
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    return year + '-' + month + '-' + day
}
