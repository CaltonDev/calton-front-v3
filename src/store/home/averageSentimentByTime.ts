import { createSlice } from '@reduxjs/toolkit'

interface AverageSentimentByTimeState {
    isLoading: boolean
    data: any
}

const initialState: AverageSentimentByTimeState = {
    isLoading: true,
    data: null,
}

export const averageSentimentByTimeSlice = createSlice({
    name: 'averageSentimentByTimeSlice',
    initialState,
    reducers: {
        setAverageSentimentByTime(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setAverageSentimentIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setAverageSentimentByTime, setAverageSentimentIsLoading } =
    averageSentimentByTimeSlice.actions
export default averageSentimentByTimeSlice.reducer
