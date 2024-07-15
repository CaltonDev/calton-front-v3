import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SourcesFilteredState {
    isLoading: boolean
    data: any | null
    surveyDetails: any | null
}

const initialState: SourcesFilteredState = {
    isLoading: true,
    data: null,
    surveyDetails: null,
}

export const sourcesFilteredSlice = createSlice({
    name: 'sourcesFilteredSlice',
    initialState,
    reducers: {
        setSourcesFiltered(state, action: PayloadAction<any>) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setSurveyData(state, action: PayloadAction<any>) {
            return { ...state, surveyDetails: action.payload }
        },
    },
})

export const { setSourcesFiltered, setSurveyData } =
    sourcesFilteredSlice.actions
export default sourcesFilteredSlice.reducer
