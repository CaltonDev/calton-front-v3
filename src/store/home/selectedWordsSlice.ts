import { createSlice } from '@reduxjs/toolkit'

export interface SelectedWordsState {
    SelectedWords: {
        word: any
        sentiment: boolean
        isText: boolean
    }
}

const initialState: SelectedWordsState = {
    SelectedWords: {
        word: null,
        sentiment: false,
        isText: false,
    },
}
export const selectedWordsSlice = createSlice({
    name: 'selectedWordsSlice',
    initialState,
    reducers: {
        setSelectedWord(state, action) {
            return {
                ...state,
                word: action.payload?.word,
                sentiment: action.payload?.sentiment,
                isText: action.payload?.isText,
            }
        },
    },
})

export const { setSelectedWord } = selectedWordsSlice.actions
export default selectedWordsSlice.reducer
