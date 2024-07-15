import { createSlice } from '@reduxjs/toolkit'

interface MenuState {
    menusLocation: string[]
}

const initialState: MenuState = {
    menusLocation: [],
}
export const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        setMenusList(state, action) {
            return { ...state, menusLocation: action.payload }
        },
    },
})

export const { setMenusList } = menuSlice.actions
export default menuSlice.reducer
