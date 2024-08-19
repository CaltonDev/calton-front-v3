import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { SelectedWordsState } from '../../../store/home/selectedWordsSlice'
import { useTranslation } from 'react-i18next'
import Hooks from '../../../utils/hooks/Hooks'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import DonutCard from '../../../components/DonutCard/DonutCard'
import TrackerCard from '../../../components/TrackerCard/TrackerCard'
import TierListCard from '../../../components/TierListCard/TierListCard'
import styles from './HomeReviews.module.scss'
import ReviewCard from '../../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../../components/Button/Button'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import FeedbackService from '../../../services/FeedbackService'
function HomeReviews() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector((state: RootState) => state.SelectedWords)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    const [isLoading, setIsLoading] = useState(true)
    const [infoData, setInfoData] = useState(null)
    const [sort, setSort] = useState([
        {
            name: 'data',
            direction: 'desc',
        },
    ])
    const [page, setPage] = useState(0)
    const [displayDownload, setDisplayDownload] = useState(false)
    const [metadataSelect, setMetadataSelect] = useState(null)
    const search = useSelector((state: RootState) => state.Search.wordSearched)
    const [customFiltersSelectable, setCustomFiltersSelectable] = useState(null)
    const user = useSelector((state: RootState) => state.User.user)

    const { t } = useTranslation()

    const [currentPage, setCurrentPage] = useState(1)

    const reloadHome = async () => {
        await ServiceWrapper.wrapperReloadHome(
            allFilters,
            'Date',
            wordSelected,
            dispatch,
            20,
            undefined,
            t
        )
    }
    /*
    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    Hooks.useDeepCompareEffect(() => {
        reloadHome()
    }, [allFilters])*/

    const tierList = [
        {
            label: 'The Fork',
            icon: 'TheFork.svg',
        },
        {
            label: 'Facebook',
            icon: 'Facebook.svg',
        },
        {
            label: 'Tripadvisor',
            icon: 'TripadvisorAPI.svg',
        },
    ]

    const changeElementsPerPage = (e: any) => {
        //setCurrentPage(e.target.value)
    }

    const changePage = (e: any) => {
        setCurrentPage(e.target.value)
    }

    const feedbacks = FeedbackService.getFeedbacks(
        undefined,
        allFilters,
        undefined,
        false,
        getNoCodeFromPlatfrom(),
        page * 20,
        20,
        sort,
        search,
        false,
        undefined,
        'xlsx',
        undefined,
        undefined,
        undefined,
        undefined
    )

    useEffect(() => {
        console.log('feedbacks: ', feedbacks)
    }, [feedbacks])

    return (
        <PageContainer>
            <PageHeader heading={t('Home')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div className={styles.itemContainer}>
                        <DonutCard
                            numberOfReviews={24547}
                            positive={45}
                            neutral={15}
                            negative={40}
                        />
                    </div>
                    <div className={styles.itemContainer}>
                        <TrackerCard numberOfReply={5463} totalReply={15000} />
                    </div>
                    <div className={styles.itemContainer}>
                        <TierListCard tierList={tierList} />
                    </div>
                </div>
                <div className={styles.navigatorRow}>
                    <div className={styles.btnContainer}>
                        <Button
                            size={'small'}
                            customColor={'#E9E7EC'}
                            customTextColor={'black'}
                        >
                            {t('Data')}
                        </Button>
                        <Button
                            size={'small'}
                            customColor={'#E9E7EC'}
                            customTextColor={'black'}
                        >
                            {t('Rating')}
                        </Button>
                    </div>
                    <div>
                        <PageNavigator
                            totalElements={255}
                            currentPage={currentPage}
                            pageElements={30}
                            changeElementsPerPage={changeElementsPerPage}
                            changePage={changePage}
                        />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <ReviewCard />
                    <ReviewCard />
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeReviews
