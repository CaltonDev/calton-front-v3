import { createSlice } from '@reduxjs/toolkit'

interface BubbleState {
    isLoading: boolean
    data: any
}

const initialState: BubbleState = {
    isLoading: true,
    data: null,
}

export const bubbleSlice = createSlice({
    name: 'bubbleSlice',
    initialState,
    reducers: {
        setBubbles(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
        setBubbleIsLoading(state, action) {
            return { ...state, isLoading: action.payload }
        },
    },
})

export const { setBubbles, setBubbleIsLoading } = bubbleSlice.actions
export default bubbleSlice.reducer
