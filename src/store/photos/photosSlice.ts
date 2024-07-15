import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the interface for the state
interface UploadPhotosState {
    photos: any[] // Define a more specific type if known
    isSingle: boolean | null
}

// Define the initial state using the interface
const initialState: UploadPhotosState = {
    photos: [],
    isSingle: null,
}

// Create the slice with defined state and actions
export const photosSlice = createSlice({
    name: 'photosSlice',
    initialState,
    reducers: {
        setUploadPhotos(state, action: PayloadAction<any[]>) {
            state.photos = action.payload
        },
        setIsSingle(state, action: PayloadAction<boolean | null>) {
            state.isSingle = action.payload
        },
        resetUploadPhotos(state) {
            state.photos = []
            state.isSingle = null
        },
    },
})

// Export the actions and reducer
export const { setUploadPhotos, setIsSingle, resetUploadPhotos } =
    photosSlice.actions
export default photosSlice.reducer
