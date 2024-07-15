import { createSlice } from '@reduxjs/toolkit'

interface SelectableFiltersState {
    allChannelSources: string[]
    allLocations: string[]
    allTopics: string[]
    allProducts: string[]
    allSources: string[]
}

const initialState: SelectableFiltersState = {
    allChannelSources: [],
    allLocations: [],
    allTopics: [],
    allProducts: [],
    allSources: [],
}

export const selectableFiltersSlice = createSlice({
    name: 'selectableFiltersSlice',
    initialState,
    reducers: {
        setAllChannelSources(state, action) {
            return {
                ...state,
                allChannelSources: action.payload,
            }
        },
        setAllLocations(state, action) {
            return {
                ...state,
                allLocations: action.payload,
            }
        },
        setAllTopics(state, action) {
            return {
                ...state,
                allTopics: action.payload,
            }
        },
        setAllProducts(state, action) {
            return {
                ...state,
                allProducts: action.payload,
            }
        },
        setAllSources(state, action) {
            return {
                ...state,
                allSources: action.payload,
            }
        },
    },
})

export const {
    setAllChannelSources,
    setAllLocations,
    setAllTopics,
    setAllProducts,
    setAllSources,
} = selectableFiltersSlice.actions
export default selectableFiltersSlice.reducer
