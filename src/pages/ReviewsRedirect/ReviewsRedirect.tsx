import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Reviews from '../Reviews/Reviews'
import SurveyReviews from '../SurveyReviews/SurveyReviews'
import SurveryReviewsTable from '../SurveryReviewsTable/SurveryReviewsTable'

function ReviewsRedirect() {
    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )
    return (
        <>
            {platformType === 'reviews' ? <Reviews /> : <SurveryReviewsTable />}
        </>
    )
}

export default ReviewsRedirect
