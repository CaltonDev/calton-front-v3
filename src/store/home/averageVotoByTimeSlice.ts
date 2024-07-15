import { createSlice } from '@reduxjs/toolkit'

interface AverageVotoByTimeState {
    isLoading: boolean
    data: any
}

const initialState: AverageVotoByTimeState = {
    isLoading: true,
    data: null,
}

export const averageVotoByTimeSlice = createSlice({
    name: 'averageVotoByTimeSlice',
    initialState,
    reducers: {
        setAverageVotoByTime(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setAverageVotoIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setAverageVotoByTime, setAverageVotoIsLoading } =
    averageVotoByTimeSlice.actions
export default averageVotoByTimeSlice.reducer
