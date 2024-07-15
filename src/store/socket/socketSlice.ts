import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

interface SocketState {
    message: any[]
    consumeLocally: boolean
}

const initialState: SocketState = {
    message: [],
    consumeLocally: false,
}

export const socketSlice = createSlice({
    name: 'socketSlice',
    initialState,
    reducers: {
        pushSocketMessage(state, action: PayloadAction<any>) {
            let tmpCurrentMessage: any[] = []
            if (state.message) {
                tmpCurrentMessage = JSON.parse(
                    JSON.stringify(current(state.message))
                )
            }
            tmpCurrentMessage.push(action.payload)
            return { ...state, message: tmpCurrentMessage }
        },
        popSocketMessage(state) {
            if (state.message && state.message.length > 0) {
                state.message.shift()
            }
            return state
        },
        resetSocketMessage(state) {
            return { ...state, message: [], consumeLocally: false }
        },
        setConsumeLocally(state, action: PayloadAction<boolean>) {
            return { ...state, consumeLocally: action.payload }
        },
    },
})

export const {
    pushSocketMessage,
    popSocketMessage,
    resetSocketMessage,
    setConsumeLocally,
} = socketSlice.actions
export default socketSlice.reducer
