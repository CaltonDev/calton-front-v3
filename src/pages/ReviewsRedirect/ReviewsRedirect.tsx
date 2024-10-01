import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Reviews from '../Reviews/Reviews'
import SurveyReviews from '../SurveyReviews/SurveyReviews'

function ReviewsRedirect() {
    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )
    return <> {platformType === 'reviews' ? <Reviews /> : <SurveyReviews />}</>
}

export default ReviewsRedirect
