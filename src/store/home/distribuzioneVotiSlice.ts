import { createSlice } from '@reduxjs/toolkit'

interface DistribuzioniVotiState {
    isLoading: boolean
    data: any
}

const initialState: DistribuzioniVotiState = {
    isLoading: true,
    data: null,
}

export const distribuzioneVotiSlice = createSlice({
    name: 'distribuzioneVotiSlice',
    initialState,
    reducers: {
        setDistribuzioniVoti(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setDistribuzioniVotiIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setDistribuzioniVoti, setDistribuzioniVotiIsLoading } =
    distribuzioneVotiSlice.actions
export default distribuzioneVotiSlice.reducer
