import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import HomeReviews from './HomeReviews/HomeReviews'
import HomeSurveys from './HomeSurveys/HomeSurveys'
import HomeCompetitor from './HomeCompetitor/HomeCompetitor'
import HomeListing from './HomeListing/HomeListing'
function Home() {
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    return (
        <>
            {' '}
            {platformType === 'reviews' ? (
                <HomeReviews />
            ) : platformType === 'surveys' ? (
                <HomeSurveys />
            ) : platformType === 'competitor' ? (
                <HomeCompetitor />
            ) : (
                platformType === 'listing' && <HomeListing />
            )}
        </>
    )
}

export default Home
