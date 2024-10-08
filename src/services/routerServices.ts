// routes
import { lazy } from 'react'
import SurveysInsights from '../pages/SurveyInsights/SurveysInsights'

const Home = lazy(() => import('../pages/Home/Home'))
const Luoghi = lazy(() => import('../pages/Luoghi/Luoghi'))
const Canali = lazy(() => import('../pages/Canali/Canali'))
const ReviewsRedirect = lazy(
    () => import('../pages/ReviewsRedirect/ReviewsRedirect')
)
const Settings = lazy(() => import('../pages/Settings/Settings'))
const Fonti = lazy(() => import('../pages/Fonti/Fonti'))
const SmartResponses = lazy(
    () => import('../pages/SmartResponses/SmartResponses')
)
const Surveys = lazy(() => import('../pages/Surveys/Surveys'))
const AddFonti = lazy(() => import('../pages/AddFonti/AddFonti'))
const SmartResponseEdit = lazy(
    () => import('../pages/SmartResponseEdit/SmartResponsesEdit')
)
// const UploadFonti = lazy(() => import('../pages/UploadFonti/UploadFonti'))
const Topic = lazy(() => import('../pages/Topic/Topic'))
const Hours = lazy(() => import('../pages/Hours/Hours'))
const SelectableCards = lazy(
    () => import('../pages/SelectableCards/SelectableCards')
)
const SurveyReviews = lazy(() => import('../pages/SurveyReviews/SurveyReviews'))

export const objRoutes = {
    Dashboards: {
        path: 'home',
        component: Home,
    },
    Luoghi: {
        path: 'locations',
        component: Luoghi,
    },
    Canali: {
        path: 'channels',
        component: Canali,
    },
    Fonti: {
        path: 'fonti',
        component: Fonti,
    },
    Reviews: {
        path: 'reviews',
        component: ReviewsRedirect,
    },
    Settings: {
        path: 'settings',
        component: Settings,
    },
    //change path when available
    SmartResponses: {
        path: 'products',
        component: SmartResponses,
    },
    /*AddFonti: {
        path: 'chooseLocations',
        component: AddFonti,
    },*/
    //change path when available
    SmartResponseEdit: {
        path: 'grafo',
        component: SmartResponseEdit,
    },
    Topic: {
        path: 'analisiavanzata',
        component: Topic,
    },
    Hours: {
        path: 'hours',
        component: Hours,
    },
    SelectableCards: {
        path: 'chooseLocations',
        component: SelectableCards,
    },
    Surveys: {
        path: 'surveys',
        component: Surveys,
    },
    InsightsSurvey: {
        path: 'insights/:id',
        component: SurveyReviews,
    },
}
