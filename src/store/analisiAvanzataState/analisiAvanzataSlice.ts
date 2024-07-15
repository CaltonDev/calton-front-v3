import { createSlice } from '@reduxjs/toolkit'

interface AnalisiAvanzataState {
    chipTopics: any
    chipSentiment: any
    chipsVotiPerData: any
    distribuzioneTopic: any
    distribuzioneSentiment: any
    distribuzioneTopicPerSentiment: any
    distribuzioneTopicPerData: any
    votoMedioTopicPerData: any
    votoMedioTopic: any
    countTopic: any
    reviewsInfos: any
    avgRating: any
    avgSentiment: any
    showPercentage: boolean
    bestWorst: any
}

const initialState: AnalisiAvanzataState = {
    chipTopics: null,
    chipSentiment: null,
    chipsVotiPerData: null,
    distribuzioneTopic: null,
    distribuzioneSentiment: null,
    distribuzioneTopicPerSentiment: null,
    distribuzioneTopicPerData: null,
    votoMedioTopicPerData: null,
    votoMedioTopic: null,
    countTopic: null,
    reviewsInfos: null,
    avgRating: null,
    avgSentiment: null,
    showPercentage: false,
    bestWorst: null,
}

export const analisiAvanzataSlice = createSlice({
    name: 'analisiAvanzataSlice',
    initialState,
    reducers: {
        setTopics(state, action) {
            return { ...state, chipTopics: action.payload }
        },
        setSentimentChips(state, action) {
            return { ...state, chipSentiment: action.payload }
        },
        setDistribuzioneTopic(state, action) {
            return { ...state, distribuzioneTopic: action.payload }
        },
        setDistribuzioneTopicPerSentiment(state, action) {
            return { ...state, distribuzioneTopicPerSentiment: action.payload }
        },
        setDistribuzioneTopicPerData(state, action) {
            return { ...state, distribuzioneTopicPerData: action.payload }
        },
        setVotoMedioTopicPerData(state, action) {
            return { ...state, votoMedioTopicPerData: action.payload }
        },
        setVotoMedioTopic(state, action) {
            return { ...state, votoMedioTopic: action.payload }
        },
        setCountTopic(state, action) {
            return { ...state, countTopic: action.payload }
        },
        setReviewsInfos(state, action) {
            return { ...state, reviewsInfos: action.payload }
        },
        setAvgRating(state, action) {
            return { ...state, avgRating: action.payload }
        },
        setAvgSentiment(state, action) {
            return { ...state, avgSentiment: action.payload }
        },
        setDistribuzioneSentiment(state, action) {
            return { ...state, distribuzioneSentiment: action.payload }
        },
        setChipsVotiPerData(state, action) {
            return { ...state, chipsVotiPerData: action.payload }
        },
        setShowPercentage(state, action) {
            return { ...state, showPercentage: !state.showPercentage }
        },
        setBestWorst(state, action) {
            return { ...state, bestWorst: action.payload }
        },
    },
})

export const {
    setTopics,
    setSentimentChips,
    setDistribuzioneTopic,
    setDistribuzioneTopicPerSentiment,
    setDistribuzioneTopicPerData,
    setVotoMedioTopicPerData,
    setVotoMedioTopic,
    setCountTopic,
    setReviewsInfos,
    setAvgRating,
    setAvgSentiment,
    setDistribuzioneSentiment,
    setChipsVotiPerData,
    setShowPercentage,
    setBestWorst,
} = analisiAvanzataSlice.actions
export default analisiAvanzataSlice.reducer
