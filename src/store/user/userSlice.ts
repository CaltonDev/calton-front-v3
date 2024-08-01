// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ObjectType {
    [key: string]: any
}

interface User {
    id?: string
    email?: string
    token?: string
}

export interface UserData {
    user: User | null
    navLinks?: ObjectType
    routes?: ObjectType
    trustpilotReply?: boolean
}

const initialState: UserData = {
    user: null,
    navLinks: {},
    routes: {},
    trustpilotReply: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserData | null>) => {
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload.user,
                    navLinks: action.payload.navLinks,
                    routes: action.payload.routes,
                    trustpilotReply: action.payload.trustpilotReply,
                }
            }
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
