import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { listingStateObj } from '../../constants/CustomConstants'

const now = new Date()
const endDate = moment(now).format('YYYY-MM-DD')
now.setFullYear(now.getFullYear() - 1)
const startDate = moment(now).format('YYYY-MM-DD')

interface FiltersState {
    dis1day: boolean
    dis7days: boolean
    dis1month: boolean
    dis3months: boolean
    dis6months: boolean
    dis1year: boolean
    selectedTime: string
    selectedProducts: any[]
    groupby: string
    selectedSource: any[]
    sourceName: string | null
    startDate: string
    endDate: string
    labelDate: string
    selectedChannel: any[]
    selectedLocation: any[]
    selectedLocationDetails: any[]
    selectedLocationListing: any[]
    listingLocationState: typeof listingStateObj
    selectedTopics: any[]
    selectedTopicsDetails: any | null
    customFilters: any[]
    customFiltersSelectable: any[]
    feedbackFilters: any[]
    selectedProductsDetails: any | null
    timeLabel: string
}

const initialState: FiltersState = {
    dis1day: false,
    dis7days: false,
    dis1month: false,
    dis3months: false,
    dis6months: false,
    dis1year: false,
    selectedTime: '1y',
    selectedProducts: [],
    groupby: 'Q',
    selectedSource: [],
    sourceName: null,
    startDate: startDate,
    endDate: endDate,
    labelDate: 'Anno Corrente',
    selectedChannel: [],
    selectedLocation: [],
    selectedLocationDetails: [],
    selectedLocationListing: [],
    listingLocationState: listingStateObj,
    selectedTopics: [],
    selectedTopicsDetails: null,
    customFilters: [],
    customFiltersSelectable: [],
    feedbackFilters: [],
    selectedProductsDetails: null,
    timeLabel: '',
}

export const filtersSlice = createSlice({
    name: 'filtersSlice',
    initialState,
    reducers: {
        setAllFilters(state, action: PayloadAction<Partial<FiltersState>>) {
            return {
                ...state,
                ...action.payload,
            }
        },
        resetFilters(state) {
            return {
                ...initialState,
            }
        },
        setCustomFilterSelectable(state, action: PayloadAction<any[]>) {
            return {
                ...state,
                customFiltersSelectable: action.payload,
            }
        },
        resetFiltersByPayload(state, action: PayloadAction<string>) {
            switch (action.payload) {
                case 'groupby':
                    return { ...state, groupby: 'Q', timeLabel: '' }
                case 'selectedSource':
                    return { ...state, selectedSource: [], sourceName: null }
                case 'selectedChannel':
                    return { ...state, selectedChannel: [] }
                case 'customFilters':
                    return { ...state, customFilters: [] }
                case 'selectedTime':
                    return {
                        ...state,
                        selectedTime: '1y',
                        startDate: startDate,
                        endDate: endDate,
                    }
                case 'selectedLocation':
                    return {
                        ...state,
                        selectedLocation: [],
                        selectedLocationDetails: [],
                        selectedLocationListing: [],
                    }
                case 'listingLocationState':
                    return { ...state, listingLocationState: listingStateObj }
                case 'selectedTopics':
                    return {
                        ...state,
                        selectedTopics: [],
                        selectedTopicsDetails: null,
                        customFilters: current(state.customFilters).filter(
                            (elm) =>
                                elm.collection !== 'feedback' &&
                                elm.attribute === 'testo'
                        ),
                    }
                case 'feedbackFilters':
                    return {
                        ...state,
                        customFilters: current(state.customFilters).filter(
                            (elm) => elm.collection !== 'feedback'
                        ),
                    }
                case 'selectedProducts':
                    return {
                        ...state,
                        selectedProducts: [],
                        selectedProductsDetails: null,
                    }
                default:
                    return state
            }
        },
        setGroupBy(state, action: PayloadAction<string>) {
            return { ...state, groupby: action.payload }
        },
        setCustomFilter(state, action: PayloadAction<any[]>) {
            return { ...state, customFilters: action.payload }
        },
        setFeedbackFilters(state, action: PayloadAction<any[]>) {
            return { ...state, feedbackFilters: action.payload }
        },
        setProductsFilters(state, action: PayloadAction<any[]>) {
            return { ...state, selectedProducts: action.payload }
        },
        setStateSelect(
            state: any,
            action: PayloadAction<{
                type: string | undefined
                value: any
                optional?: any | null
                labelDate?: string | null
            }>
        ) {
            const {
                type,
                value,
                optional = null,
                labelDate = null,
            } = action.payload
            switch (type) {
                case 'source':
                    return {
                        ...state,
                        selectedSource: value,
                        sourceName: optional,
                    }
                case 'groupby':
                    return { ...state, groupby: value }
                case 'time':
                    if (value.endDate && optional) {
                        return {
                            ...state,
                            selectedTime: value,
                            startDate: value.startDate,
                            endDate: value.endDate,
                            labelDate: labelDate,
                            groupby: optional,
                        }
                    } else if (value.endDate) {
                        return {
                            ...state,
                            selectedTime: value,
                            startDate: value.startDate,
                            labelDate: labelDate,
                            endDate: value.endDate,
                        }
                    } else if (optional) {
                        return {
                            ...state,
                            selectedTime: value,
                            startDate: value.startDate,
                            labelDate: labelDate,
                            groupby: optional,
                        }
                    } else {
                        return {
                            ...state,
                            selectedTime: value,
                            startDate: value.startDate,
                            labelDate: labelDate,
                        }
                    }
                case 'channelSources':
                    return { ...state, selectedChannel: value }
                case 'locations':
                    return {
                        ...state,
                        selectedLocation: value,
                        selectedLocationDetails: optional,
                        selectedLocationListing: optional
                            ? optional.map(
                                  (item: any) =>
                                      item?.account?.name + '/' + item?.name
                              )
                            : optional,
                    }
                case 'listingLocationState':
                    return { ...state, listingLocationState: value }
                case 'topics':
                    return {
                        ...state,
                        selectedTopics: value,
                        selectedTopicsDetails: optional,
                    }
                case 'selectedProducts':
                    return {
                        ...state,
                        selectedProducts: value,
                        selectedProductsDetails: optional,
                    }
                default:
                    return state
            }
        },
    },
})

export const {
    setAllFilters,
    setGroupBy,
    setStateSelect,
    setCustomFilter,
    resetFilters,
    setFeedbackFilters,
    resetFiltersByPayload,
    setCustomFilterSelectable,
    setProductsFilters,
} = filtersSlice.actions
export default filtersSlice.reducer
