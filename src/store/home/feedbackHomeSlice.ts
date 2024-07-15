import { createSlice } from '@reduxjs/toolkit'

interface FeedbackHomeState {
    isLoadingCount: boolean
    isLoading: boolean
    data: any
    count: any
}

const initialState: FeedbackHomeState = {
    isLoadingCount: false,
    isLoading: true,
    data: null,
    count: null,
}
export const feedbackHomeSlice = createSlice({
    name: 'feedbackHomeSlice',
    initialState,
    reducers: {
        setFeedbacks(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setFeedbacksCount(state, action) {
            return { ...state, count: action.payload, isLoadingCount: false }
        },
        setFeedbackIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
        setLoadingCount(state, action) {
            return { ...state, isLoadingCount: action.payload }
        },
    },
})

export const {
    setFeedbacks,
    setFeedbacksCount,
    setFeedbackIsLoading,
    setLoadingCount,
} = feedbackHomeSlice.actions
export default feedbackHomeSlice.reducer
