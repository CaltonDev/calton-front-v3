import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import HomeReviews from './HomeReviews/HomeReviews'
function Home() {
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )

    return <> {platformType === 'reviews' && <HomeReviews />}</>
}

export default Home
