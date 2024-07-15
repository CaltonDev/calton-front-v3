import { createSlice } from '@reduxjs/toolkit'

interface AverageReviewByTimeState {
    isLoading: boolean
    data: any
}

const initialState: AverageReviewByTimeState = {
    isLoading: true,
    data: null,
}

export const averageReviewByTimeSlice = createSlice({
    name: 'averageReviewByTimeSlice',
    initialState,
    reducers: {
        setAverageReviewByTime(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setAverageReviewIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setAverageReviewByTime, setAverageReviewIsLoading } =
    averageReviewByTimeSlice.actions
export default averageReviewByTimeSlice.reducer
