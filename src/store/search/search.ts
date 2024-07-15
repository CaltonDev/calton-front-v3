import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
    wordSearched: string | null
    selectedLocationSearched: string | null
}

const initialState: SearchState = {
    wordSearched: null,
    selectedLocationSearched: null,
}

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        setWordSearched(state, action: PayloadAction<string | null>) {
            return { ...state, wordSearched: action.payload }
        },
        setSelLocSearched(state, action: PayloadAction<string | null>) {
            return { ...state, selectedLocationSearched: action.payload }
        },
        resetSearch(state) {
            return {
                ...state,
                wordSearched: null,
                selectedLocationSearched: null,
            }
        },
    },
})

export const { setWordSearched, setSelLocSearched, resetSearch } =
    searchSlice.actions
export default searchSlice.reducer
