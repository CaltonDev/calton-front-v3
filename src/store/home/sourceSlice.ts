import { createSlice } from '@reduxjs/toolkit'

interface ChartState {
    isLoading: boolean
    data: any
}

const initialState: ChartState = {
    isLoading: true,
    data: null,
}

export const sourceSlice = createSlice({
    name: 'sourceSlice',
    initialState,
    reducers: {
        setSources(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setSourcesIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setSources, setSourcesIsLoading } = sourceSlice.actions
export default sourceSlice.reducer
