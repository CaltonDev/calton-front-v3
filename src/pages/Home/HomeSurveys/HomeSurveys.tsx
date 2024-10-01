import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ServiceWrapper from '../../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../../store/store'
import DonutCard from '../../../components/DonutCard/DonutCard'
import InfoCard from '../../../components/InfoCard/InfoCard'
import TierListCard from '../../../components/TierListCard/TierListCard'
import styles from './HomeSurveys.module.scss'
import ReviewCard from '../../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../../components/Button/Button'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import { getNoCodeFromPlatfrom } from '../../../helpers/helpers'
import FeedbackService from '../../../services/FeedbackService'
import { PaginationState } from '@tanstack/react-table'
import search from '../../../store/search/search'
import SmartResponseService from '../../../services/SmartResponseService'
import TopicService from '../../../services/TopicService'
import { showToast } from '../../../store/toast/errorToastSlice'
import ScraperService from '../../../services/ScraperService'
import _ from 'lodash'
import TrackerCard from '../../../components/TrackerCard/TrackerCard'
import CardSurvey from '../../../components/Cards/SurveyCard/SurveyCard'
import moment from 'moment'
import HomeService from '../../../services/HomeService'
function HomeSurveys() {
    const allFilters = useSelector(selectAllFilters)

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

    const surveys = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        true,
        undefined,
        undefined,
        undefined
    )?.data?.data

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 20,
    })
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
            //TODO: we need to paginate the api
            /* if (
                number > 0 &&
                number <= Math.ceil(surveys?.countFeed / pagination.pageSize)
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
            }*/
        }
    }

    const changeElementsPerPage = (e: any) => {
        setPagination({
            pageIndex: 0,
            pageSize: e.value,
        })
    }

    const trackerData = [
        {
            label: t('Media tasso di completamento'),
            displayLabel: '15%',
            value: 200000,
            total: 15000,
        },
    ]

    return (
        <PageContainer>
            <PageHeader heading={t('Home')} subheading={true}></PageHeader>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div className={styles.itemContainer}>
                        <InfoCard
                            value={16}
                            label={t('Sondaggi creati')}
                            icon={'surveyIconSvg'}
                        />
                    </div>
                    <div className={styles.itemContainer}>
                        <InfoCard
                            value={64}
                            label={t('Totale domande')}
                            icon={'questionIconSvg'}
                        />
                    </div>
                    <div className={styles.itemContainer}>
                        <TrackerCard data={trackerData} maxHeight={true} />
                    </div>
                    <div className={styles.itemContainer}>
                        <TierListCard
                            tierList={tierList}
                            label={t('dei sondaggi')}
                        />
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
                    </div>
                    <div>
                        <PageNavigator
                            totalElements={100 /*surveys?.countFeed*/}
                            currentPage={pagination.pageIndex}
                            pageElements={pagination.pageSize}
                            changeElementsPerPage={changeElementsPerPage}
                            changePage={changePage}
                        />
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    {surveys?.map((survey: any, idx: number) => {
                        return (
                            <CardSurvey
                                key={idx}
                                id={survey?._id}
                                elm={survey}
                                name={survey?.name}
                                userStart={
                                    survey?.typeformInfo?.summary?.total_visits
                                }
                                completition={
                                    survey?.typeformInfo?.summary
                                        ?.completion_rate
                                }
                                time={moment
                                    .utc(
                                        survey?.typeformInfo?.summary
                                            ?.average_time * 1000
                                    )
                                    .format('mm:ss')}
                                sentiment={survey?.meanSentiment}
                                response={
                                    survey?.typeformInfo?.summary
                                        ?.responses_count
                                }
                                date={moment
                                    .utc(survey?.createdAt)
                                    .format('DD/MM/YYYY')}
                                index={idx}
                            />
                        )
                    })}
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeSurveys
