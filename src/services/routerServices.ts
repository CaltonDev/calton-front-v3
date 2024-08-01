// routes
import { lazy } from 'react'
import React from 'react'

// a function to retry loading a chunk to avoid chunk load error for out of date code
/*
const lazyRetry = function(componentImport, name) {
    return new Promise((resolve, reject) => {
        // check if the window has already been refreshed
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
        );
        // try to import the component
        componentImport().then((component) => {
            window.sessionStorage.setItem(`retry-${name}-refreshed`, 'false'); // success so reset the refresh
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) { // not been refreshed yet
                window.sessionStorage.setItem(`retry-${name}-refreshed`, 'true'); // we are now going to refresh
                return window.location.reload(); // refresh the page
            }
            reject(error); // Default error behaviour as already tried refresh
        });
    });
};

const AnalisiAvanzata = lazy(() => lazyRetry(() => import("../pages/AnalisiAvanzata/AnalisiAvanzata"), "AnalisiAvanzata"));
//const Competitor = lazy(() => lazyRetry(() => import("../pages/Competitor/Competitor"), "Competitor"));
const CreateSurvey = lazy(() => lazyRetry(() => import("../pages/Surveys/CreateSurvey/CreateSurvey"), "CreateSurvey"));
const EditSurvey = lazy(() => lazyRetry(() => import("../pages/Surveys/EditSurvey/EditSurvey"), "EditSurvey"));
const Fonti = lazy(() => lazyRetry(() => import("../pages/Fonti/Fonti"), "Fonti"));
const Grafo = lazy(() => lazyRetry(() => import("../pages/Grafo/Grafo"), "Grafo"));
const Home = lazy(() => lazyRetry(() => import("../pages/Home/Home"), "Home"));
const Integrations = lazy(() => lazyRetry(() => import("../pages/Integrations/Integration"), "Integration"));
const Luoghi = lazy(() => lazyRetry(() => import("../pages/Luoghi/Luoghi"), "Luoghi"));
const Profile = lazy(() => lazyRetry(() => import("../pages/Profile/Profile"), "Profile"));
const ReviewsWrapper = lazy(() => lazyRetry(() => import("../pages/Reviews/ReviewsWrapper"), "ReviewsWrapper"));
const SelectableCards = lazy(() => lazyRetry(() => import("../pages/SelectableCards/SelectableCards"), "SelectableCards"));
const Settings = lazy(() => lazyRetry(() => import("../pages/Settings/Settings"), "Settings"));
const Surveys = lazy(() => lazyRetry(() => import("../pages/Surveys/Surveys"), "Surveys"));
const AnalysisCharts = lazy(() => lazyRetry(() => import("../pages/AnalisiAvanzata/AnalysisCharts/AnalysisCharts"), "AnalysisCharts"));
const AddCompetitorsSource = lazy(() => lazyRetry(() => import("../pages/AddCompetitorsSource/AddCompetitorsSource"), "AddCompetitorsSource"));
const InsightsSurvey = lazy(() => lazyRetry(() => import("../pages/InsightsSurvey/InsightsSurvey"), "InsightsSurvey"));
const Products = lazy(() => lazyRetry(() => import("../pages/Products/Products"), "Products"));
*/

const Home = lazy(() => import('../pages/Home/Home'))

/*

const AnalisiAvanzata = lazy(() => import("../pages/AnalisiAvanzata/AnalisiAvanzata"));
//const Competitor = lazy(() => import("../pages/Competitor/Competitor"));
const CreateSurvey = lazy(() => import("../pages/Surveys/CreateSurvey/CreateSurvey"));
const EditSurvey = lazy(() => import("../pages/Surveys/EditSurvey/EditSurvey"));
const Fonti = lazy(() => import("../pages/Fonti/Fonti"));
const Grafo = lazy(() => import("../pages/Grafo/Grafo"));
const Integrations = lazy(() => import("../pages/Integrations/Integration"));
const Luoghi = lazy(() => import("../pages/Luoghi/Luoghi"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ReviewsWrapper = lazy(() => import("../pages/Reviews/ReviewsWrapper"));
const SelectableCards = lazy(() => import("../pages/SelectableCards/SelectableCards"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Surveys = lazy(() => import("../pages/Surveys/Surveys"));
const AnalysisCharts = lazy(() => import("../pages/AnalisiAvanzata/AnalysisCharts/AnalysisCharts"));
const AddCompetitorsSource = lazy(() => import("../pages/AddCompetitorsSource/AddCompetitorsSource"));
const InsightsSurvey = lazy(() => import("../pages/InsightsSurvey/InsightsSurvey"));
const Products = lazy(() => import("../pages/Products/Products"));
const ListingHours = lazy(() => import("../pages/ListingHours/ListingHours"));
const ListingMenu = lazy(()=> import("../pages/ListingMenu/ListingMenu"))
const ListingEditOthers = lazy(()=> import("../pages/ListingEditOthers/ListingEditOthers"))
const ListingEditInfo = lazy(()=> import("../pages/ListingEditInfo/ListingEditInfo"))
const ListingUploadPhotos = lazy(()=> import("../pages/ListingUploadPhotos/ListingUploadPhotos"))
const Performance = lazy(()=> import("../pages/Performance/Performance"))
const ListingEditHours = lazy(()=> import("../pages/ListingHours/ListingEditHours/ListingEditHours"))
const ListingEditMenu = lazy(()=> import("../pages/ListingEditMenu/ListingEditMenu"))
const ListingPhotos = lazy(()=> import("../pages/ListingPhotos/ListingPhotos"))
const ListingCreatePost = lazy(()=> import("../pages/ListingCreatePost/ListingCreatePost"))
const ListingCalendarPost = lazy(()=> import("../pages/ListingCalendarPost/ListingCalendarPost"))
const ListingPosts = lazy(()=> import("../pages/ListingPosts/ListingPosts"))
const ListingPostInfo = lazy(()=> import("../pages/ListingPostInfo/ListingPostInfo"))*/
export const objRoutes = {
    Dashboards: {
        path: 'home',
        component: Home,
    },
}
