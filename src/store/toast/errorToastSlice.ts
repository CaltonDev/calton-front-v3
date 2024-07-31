import { createSlice, current } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface ErrorToastState {
    data: any
    currentToast: string[]
}

const initialState: ErrorToastState = {
    data: null,
    currentToast: [],
}
export const errorToastSlice = createSlice({
    name: 'errorToastSlice',
    initialState,
    reducers: {
        setCurrentToasts(state, action) {
            return { ...state, currentToast: action.payload }
        },
        showToast(state, action) {
            const {
                type,
                text,
                func,
                pendingText,
                successText,
                errorText,
                idTask,
                position = '',
                autoClose = 2000,
            } = action.payload
            if (type === 0) {
                toast.success(text)
            } else if (type === 1) {
                toast.warn(text)
            } else if (type === 2) {
                toast.error(text)
            } else if (type === 3) {
                toast.promise(func, {
                    pending: pendingText,
                    success: successText,
                    error: errorText,
                })
            } else if (type === 4) {
                // const id = toast.loading(pendingText, {toastId: idTask})
                const tmpCurrToast = JSON.parse(
                    JSON.stringify(current(state.currentToast))
                )
                tmpCurrToast.push({
                    id: idTask,
                    text: pendingText,
                    position: position,
                    autoClose: autoClose,
                    closeButton: true,
                    closeOnClick: true,
                })
                toast.update(idTask, {
                    render: pendingText,
                    isLoading: true,
                    autoClose: 2000,
                    position: position,
                    closeButton: true,
                    closeOnClick: true,
                })
                return { ...state, currentToast: tmpCurrToast }
            } else if (type === 5) {
                toast.update(idTask, {
                    render: pendingText,
                    type: 'success',
                    isLoading: false,
                    autoClose: 2000,
                    position: position,
                    closeButton: true,
                    closeOnClick: true,
                })
                const tmpCurrToast = current(state.currentToast).filter(
                    (item: any) => item.id !== idTask
                )
                return { ...state, currentToast: tmpCurrToast }
            } else if (type === 6) {
                toast.update(idTask, {
                    render: pendingText,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                    closeButton: true,
                    closeOnClick: true,
                })
                const tmpCurrToast = current(state.currentToast).filter(
                    (item: any) => item.id !== idTask
                )
                return { ...state, currentToast: tmpCurrToast }
            } else if (type === 7) {
                toast.dismiss()
                return { ...state, currentToast: [] }
            } else if (type === 8) {
                toast.update(idTask, {
                    render: pendingText,
                    type: 'warning',
                    isLoading: false,
                    autoClose: 2000,
                    closeButton: true,
                    closeOnClick: true,
                })
                const tmpCurrToast = current(state.currentToast).filter(
                    (item: any) => item?.id !== idTask
                )
                return { ...state, currentToast: tmpCurrToast }
            }
        },
    },
})

export const { showToast, setCurrentToasts } = errorToastSlice.actions
export default errorToastSlice.reducer
