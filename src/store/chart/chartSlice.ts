import { createSlice } from '@reduxjs/toolkit'

interface ChartState {
    filteredChartTopics: string[]
    topicsNames: string[]
}

const initialState: ChartState = {
    filteredChartTopics: [],
    topicsNames: [],
}

export const chartSlice = createSlice({
    name: 'chartSlice',
    initialState,
    reducers: {
        addFilteredTopicSuccess(state, action) {
            return {
                ...state,
                filteredChartTopics: [
                    ...state.filteredChartTopics,
                    action.payload,
                ],
            }
        },
        deleteFilteredTopicSuccess(state, action) {
            return {
                ...state,
                filteredChartTopics: state.filteredChartTopics.filter(
                    (item) => item !== action.payload
                ),
            }
        },
        addTopicNamesSuccess(state, action) {
            return {
                ...state,
                topicsNames: [...state.topicsNames, ...action.payload],
            }
        },
    },
})

export const {
    addFilteredTopicSuccess,
    deleteFilteredTopicSuccess,
    addTopicNamesSuccess,
} = chartSlice.actions
export default chartSlice.reducer
