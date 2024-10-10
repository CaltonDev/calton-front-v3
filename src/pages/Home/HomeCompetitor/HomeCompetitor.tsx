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
import styles from './HomeCompetitor.module.scss'
import ReviewCard from '../../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../../components/Button/Button'
import PageNavigator from '../../../components/PageNavigator/PageNavigator'
import { getNoCodeFromPlatfrom, searchHeader } from '../../../helpers/helpers'
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
import { useNavigate } from 'react-router-dom'
import ChartConfig from '../../../constants/ChartConfig'
import BubbleChartComparison from '../../../components/Charts/BubbleCharts/BubbleChartComparison/BubbleChartComparison'
import Table from '../../../components/Table/Table'
import SourcesService from '../../../services/SourcesService'
function HomeCompetitor() {
    const allFilters = useSelector(selectAllFilters)
    const history = useNavigate()
    const user = useSelector((state: RootState) => state.User)
    const isAdmin =
        user?.user?.typeAccount == null || user?.user?.typeAccount === 2
    const { t } = useTranslation()

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const handleCreateCompetitor = () => {
        // setCreateCompetitor(true)
        history('./AddCompetitorsSource')
    }

    const chartData = HomeService.compareCols(allFilters)?.data

    const kpiData = HomeService.compareMainKPI(allFilters, false)?.data

    const allFonti = HomeService.getSourcesHome(
        allFilters,
        getNoCodeFromPlatfrom(),
        undefined,
        undefined,
        undefined,
        true,
        true
    )?.data

    /*
    //todo: think about using search var inside react query to auto update queries and delete this useless useEffect
    useEffect(() => {
        searchHeader(search, allFonti, setAllFontiFiltered)
    }, [search, allFonti])*/

    return (
        <PageContainer>
            <PageHeader
                heading={t('Competitors')}
                subheading={true}
            ></PageHeader>
            <Button
                size="medium"
                className={styles.btnActive}
                disabled={!isAdmin}
                onClick={handleCreateCompetitor}
            >
                {t('Gestisci competitor')}
            </Button>
            <div className={styles.container}>
                <div className={styles.bubbleChartGraphContainer}>
                    <BubbleChartComparison
                        dataReady={chartData}
                        title={t('Quadrante competitor')}
                        contentPopover={t('NumeroRecensioniHelper')}
                        chartdata={chartData ? chartData?.data : []}
                        // chartdata={averageReviewByTime?.data?.data && averageReviewByTime.data?.data[1]}
                        // labels={averageReviewByTime?.data?.data && averageReviewByTime.data?.data[0]}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        data={allFonti?.data || []}
                        columnsData={allFonti?.columns || []}
                        fullyLoaded={true}
                        bottomNavigator={true}
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </div>
            </div>
        </PageContainer>
    )
}

export default HomeCompetitor
