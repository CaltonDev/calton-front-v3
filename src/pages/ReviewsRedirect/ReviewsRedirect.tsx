import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Reviews from '../Reviews/Reviews'
import SurveyReplies from '../SurveyReplies/SurveyReplies'

function ReviewsRedirect() {
    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )
    return (
        <>
            {' '}
            {platformType === 'reviews' ? (
                <Reviews />
            ) : (
                platformType === 'surveys' && (
                    <SurveyReplies isFromHome={true} />
                )
            )}
        </>
    )
}

export default ReviewsRedirect
