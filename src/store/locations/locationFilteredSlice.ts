import { createSlice } from '@reduxjs/toolkit'

interface LocationFilteredState {
    isLoading: boolean
    data: any
}

const initialState: LocationFilteredState = {
    isLoading: true,
    data: null,
}
export const locationFilteredSlice = createSlice({
    name: 'locationFilteredSlice',
    initialState,
    reducers: {
        setLocationFiltered(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
    },
})

export const { setLocationFiltered } = locationFilteredSlice.actions
export default locationFilteredSlice.reducer
