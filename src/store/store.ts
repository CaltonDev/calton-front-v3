import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import settingsSlice from './settings/settingsSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        settings: settingsSlice,
    },
})
export type RootState = ReturnType<typeof store.getState>
export default store
