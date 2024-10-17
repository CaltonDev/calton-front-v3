import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Reviews from '../Reviews/Reviews'
import SurveyReplies from '../SurveyReplies/SurveyReplies'
import SurveyReviews from '../SurveyReviews/SurveyReviews'
import SurveryReviewsTable from '../SurveryReviewsTable/SurveryReviewsTable'
import ReviewsCompetitor from '../ReviewsCompetitor/ReviewsCompetitor'

function ReviewsRedirect() {
    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )
    return (
        <>
            {' '}
            {platformType === 'reviews' ? (
                <Reviews />
            ) : platformType === 'competitor' ? (
                <ReviewsCompetitor />
            ): (
                platformType === 'surveys' && (
                    <SurveyReplies isFromHome={true} />
                )
            }
        </>
    )
}

export default ReviewsRedirect
