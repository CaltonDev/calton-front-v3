// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NavLink {
    [key: string]: any
}

interface User {
    id?: string
    email?: string
    token?: string
}

export interface UserData {
    user: User | null
    navLinks?: NavLink
    routes?: any[]
    trustpilotReply?: boolean
}

export interface UserState {
    data: UserData
}

const initialState: UserState = {
    data: {
        user: null,
        navLinks: {},
        routes: [],
        trustpilotReply: false,
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserData | null>) => {
            if (action.payload) {
                state.data = action.payload
            }
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
