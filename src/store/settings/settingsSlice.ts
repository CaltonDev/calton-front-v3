import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        platformType: 'reviews',
        isSidebarOpen: false,
        filters: [],
        selectedFilter: null,
        showNumbers: false,
    },
    reducers: {
        setPlatformType(state, action) {
            return { ...state, platformType: action.payload }
        },
        setFilters(state, action) {
            return { ...state, filters: action.payload }
        },
        setSidebar(state, action) {
            return { ...state, isSidebarOpen: action.payload }
        },
        setSelectedFilter(state, action) {
            return { ...state, selectedFilter: action.payload }
        },
        setShowNumbers(state, action) {
            return { ...state, showNumbers: action.payload }
        },
    },
})

export const {
    setPlatformType,
    setFilters,
    setSidebar,
    setSelectedFilter,
    setShowNumbers,
} = settingsSlice.actions
export default settingsSlice.reducer
