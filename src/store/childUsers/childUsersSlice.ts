import { createSlice } from '@reduxjs/toolkit'

interface ChildUsersState {
    isLoading: boolean
    data: any
}

const initialState: ChildUsersState = {
    isLoading: true,
    data: null,
}

export const childUsersSlice = createSlice({
    name: 'childUsersSlice',
    initialState,
    reducers: {
        setChildUsers(state, action) {
            return { ...state, data: action.payload, isLoading: false }
        },
    },
})

export const { setChildUsers } = childUsersSlice.actions
export default childUsersSlice.reducer
