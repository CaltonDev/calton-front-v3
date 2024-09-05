import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../store/store'
import DonutCard from '../../components/DonutCard/DonutCard'
import TrackerCard from '../../components/TrackerCard/TrackerCard'
import TierListCard from '../../components/TierListCard/TierListCard'
import styles from './Reviews.module.scss'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../components/Button/Button'
import PageNavigator from '../../components/PageNavigator/PageNavigator'
import { getNoCodeFromPlatfrom } from '../../helpers/helpers'
import FeedbackService from '../../services/FeedbackService'
import { PaginationState } from '@tanstack/react-table'
import search from '../../store/search/search'
function Reviews() {
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

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })

    const feedbackInfo = FeedbackService.getInfoFeedbacks(
        [],
        allFilters,
        undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        undefined,
        'xlsx',
        undefined,
        undefined,
        null,
        null,
        true,
        undefined
    )?.data?.data

    const feedbacks = FeedbackService.getFeedbacks(
        [],
        allFilters,
        undefined,
        false,
        getNoCodeFromPlatfrom(),
        pagination.pageIndex * pagination.pageSize,
        pagination.pageSize,
        [
            {
                name: 'data',
                direction: 'desc',
            },
        ],
        search,
        false,
        undefined,
        'xlsx',
        undefined,
        undefined,
        null,
        null,
        true,
        undefined
    )?.data?.all_feed

    const changePage = (direction: any) => {
        if (direction === 'next') {
            setPagination({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
            })
        } else if (direction === 'previous') {
            setPagination({
                pageIndex: pagination.pageIndex - 1,
                pageSize: pagination.pageSize,
            })
        } else {
            const number = Number(direction)
            if (
                number > 0 &&
                number <=
                    Math.ceil(feedbackInfo?.countFeed / pagination.pageSize)
            ) {
                setPagination({
                    pageIndex: number - 1,
                    pageSize: pagination.pageSize,
                })
            } else {
                setPagination({
                    pageIndex: 0,
                    pageSize: pagination.pageSize,
                })
            }
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

    return (
        <PageContainer>
            <PageHeader heading={t('Reviews')} subheading={true}></PageHeader>
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
                            totalElements={feedbackInfo?.countFeed}
                            currentPage={pagination.pageIndex}
                            pageElements={pagination.pageSize}
                            changeElementsPerPage={changeElementsPerPage}
                            changePage={changePage}
                        />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    {feedbacks?.map((feedback: any, idx: number) => {
                        return <ReviewCard key={idx} feedback={feedback} />
                    })}
                </div>
            </div>
        </PageContainer>
    )
}

export default Reviews
