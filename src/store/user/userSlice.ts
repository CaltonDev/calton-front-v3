// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    user: {
        id?: string
        email?: string
        token?: string
    }
}

interface UserState {
    data: User | null
}

const initialState: UserState = {
    data: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.data = action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
