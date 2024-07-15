import { createSlice } from '@reduxjs/toolkit'

interface TypeformUrlState {
    typeformQuizRef: string
}

const initialState: TypeformUrlState = {
    typeformQuizRef: '',
}

export const typeformUrlSlice = createSlice({
    name: 'typeformUrlSlice',
    initialState,
    reducers: {
        setTypeformQuizRef(state, action) {
            return { ...state, typeformQuizRef: action.payload }
        },
    },
})

export const { setTypeformQuizRef } = typeformUrlSlice.actions
export default typeformUrlSlice.reducer
