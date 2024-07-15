import { createSlice } from '@reduxjs/toolkit'

interface CodeState {
    platformCode: string[]
}

const initialState: CodeState = {
    platformCode: [],
}
export const codeSlice = createSlice({
    name: 'codeSlice',
    initialState,
    reducers: {
        setCode(state, action) {
            return { ...state, platformCode: action.payload }
        },
    },
})

export const { setCode } = codeSlice.actions
export default codeSlice.reducer
