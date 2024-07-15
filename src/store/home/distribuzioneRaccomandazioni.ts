import { createSlice } from '@reduxjs/toolkit'

interface DistribuzioneRaccomandazioniState {
    isLoading: boolean
    data: any
}

const initialState: DistribuzioneRaccomandazioniState = {
    isLoading: true,
    data: null,
}

export const distribuzioneRaccomandazioniSlice = createSlice({
    name: 'distribuzioneRaccomandazioniSlice',
    initialState,
    reducers: {
        setDistribuzioniRacc(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setDistribuzioniRaccIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setDistribuzioniRacc, setDistribuzioniRaccIsLoading } =
    distribuzioneRaccomandazioniSlice.actions
export default distribuzioneRaccomandazioniSlice.reducer
