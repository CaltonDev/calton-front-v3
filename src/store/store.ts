import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'
import settingsSlice from './settings/settingsSlice'
import averageReviewByTimeSlice from './home/averageReviewByTime'
import averageVotoByTimeSlice from './home/averageVotoByTimeSlice'
import averageSentimentByTimeSlice from './home/averageSentimentByTime'
import distribuzioneVotiSlice from './home/distribuzioneVotiSlice'
import sourceSlice from './home/sourceSlice'
import errorToastSlice from './toast/errorToastSlice'
import selectedWordsSlice from './home/selectedWordsSlice'
import filtersSlice from './filters/filtersSlice'
import selectableFiltersSlice from './filters/selectableFiltersSlice'
import bubbleSlice from './home/bubbleSlice'
import socketSlice from './socket/socketSlice'
import feedbackHomeSlice from './home/feedbackHomeSlice'
import locationFilteredSlice from './locations/locationFilteredSlice'
import childUsersSlice from './childUsers/childUsersSlice'
import sourcesFilteredSlice from './sources/sourcesFilteredSlice'
import chartSlice from './chart/chartSlice'
import analisiAvanzataSlice from './analisiAvanzataState/analisiAvanzataSlice'
import distribuzioneRaccomandazioniSlice from './home/distribuzioneRaccomandazioni'
import searchSlice from './search/search'
import typeformUrlSlice from './typeformUrl/typeformUrlSlice'
import codeSlice from './code/codeSlice'
import menuSlice from './menus/menuSlice'
import photosSlice from './photos/photosSlice'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
/*
export interface StoreState {
        user: userSlice,
        Surveys: settingsSlice,
        AverageReviewByTime: averageReviewByTimeSlice,
        AverageVotoByTime: averageVotoByTimeSlice,
        AverageSentimentByTime: averageSentimentByTimeSlice,
        DistribuzioniVoti: distribuzioneVotiSlice,
        Source: sourceSlice,
        ShowToast: errorToastSlice,
        SelectedWords: selectedWordsSlice,
        Filters: filtersSlice,
        SelectableFilters: selectableFiltersSlice,
        Bubble: bubbleSlice,
        Socket: socketSlice,
        FeedbackHome: feedbackHomeSlice,
        LocationFiltered: locationFilteredSlice,
        ChildUsers: childUsersSlice,
        SourcesFiltered: sourcesFilteredSlice,
        Chart: chartSlice,
        AnalisiAvanzataState: analisiAvanzataSlice,
        DistribuzioneRaccomandazioni: distribuzioneRaccomandazioniSlice,
        Search: searchSlice,
        TypeformSurvey: typeformUrlSlice,
        Code: codeSlice,
        Menus: menuSlice,
        UploadPhotos: photosSlice,

}
*/
const persistConfig = {
    key: 'root',
    storage,
    //whitelist: ['user', 'settings'], // lista di slice da persistere
}

// Combinazione dei reducers
const rootReducer = combineReducers({
    User: userSlice,
    Settings: settingsSlice,
    AverageReviewByTime: averageReviewByTimeSlice,
    AverageVotoByTime: averageVotoByTimeSlice,
    AverageSentimentByTime: averageSentimentByTimeSlice,
    DistribuzioniVoti: distribuzioneVotiSlice,
    Source: sourceSlice,
    ShowToast: errorToastSlice,
    SelectedWords: selectedWordsSlice,
    Filters: filtersSlice,
    SelectableFilters: selectableFiltersSlice,
    Bubble: bubbleSlice,
    Socket: socketSlice,
    FeedbackHome: feedbackHomeSlice,
    LocationFiltered: locationFilteredSlice,
    ChildUsers: childUsersSlice,
    SourcesFiltered: sourcesFilteredSlice,
    Chart: chartSlice,
    AnalisiAvanzataState: analisiAvanzataSlice,
    DistribuzioneRaccomandazioni: distribuzioneRaccomandazioniSlice,
    Search: searchSlice,
    TypeformSurvey: typeformUrlSlice,
    Code: codeSlice,
    Menus: menuSlice,
    UploadPhotos: photosSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configurazione dello store
const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>

export default store
