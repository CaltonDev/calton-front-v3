import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { useTranslation } from 'react-i18next'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import { RootState } from '../../store/store'
import DonutCard from '../../components/DonutCard/DonutCard'
import TierListCard from '../../components/TierListCard/TierListCard'
import styles from './ReviewsCompetitor.module.scss'
import ReviewCard from '../../components/Cards/ReviewCard/ReviewCard'
import Button from '../../components/Button/Button'
import PageNavigator from '../../components/PageNavigator/PageNavigator'
import {
    getCodeOnlyCompetitors,
    getNoCodeFromPlatfrom,
} from '../../helpers/helpers'
import FeedbackService from '../../services/FeedbackService'
import { PaginationState } from '@tanstack/react-table'
import SmartResponseService from '../../services/SmartResponseService'
import TopicService from '../../services/TopicService'
import { showToast } from '../../store/toast/errorToastSlice'
import ScraperService from '../../services/ScraperService'
import _ from 'lodash'
import TrackerCard from '../../components/TrackerCard/TrackerCard'

function ReviewsCompetitor() {
    const dispatch = useDispatch()
    const allFilters = useSelector(selectAllFilters)
    const search = useSelector((state: RootState) => state.Search.wordSearched)
    const user = useSelector((state: RootState) => state.User)

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
        getCodeOnlyCompetitors(),
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
        getCodeOnlyCompetitors(),
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

    const smartResponse =
        SmartResponseService.getAllSmartResponses()?.data?.data

    const handleChangeSmartResponse = (ev: any, index: number) => {
        //  console.log(ev)
        const smartSelected = ev
        const foundedFeed = feedbacks[index]
        const indiceToChange = index
        if (smartSelected && smartSelected.srName) {
            if (foundedFeed?.obj?.isReviewer[0]?.data?.name) {
                const nameToAdd = foundedFeed?.obj?.isReviewer[0]?.data?.name
                if (nameToAdd.split(' ').length > 0) {
                    smartSelected.responseText =
                        smartSelected?.responseText?.replace(
                            new RegExp(/{{(.*?)}}/),
                            nameToAdd.split(' ')[0]
                        )
                } else {
                    smartSelected.responseText =
                        smartSelected?.responseText?.replace(
                            new RegExp(/{{(.*?)}}/),
                            nameToAdd
                        )
                }
            }
            foundedFeed.string.isAnswer[0].data['smartSelected'] = smartSelected
        } else {
            foundedFeed.string.isAnswer[0].data['smartSelected'] = undefined
        }
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[indiceToChange] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide
    }

    const handleChangeTopic = async (topics: any, index: number) => {
        const idFeedback = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === '_id'
        )?.data
        let foundedFeed = feedbacks[index]

        const beforeChangeTopic = JSON.parse(JSON.stringify(feedbacks[index]))
        if (_.isEqual(beforeChangeTopic?.list?.isTopic[0]?.data, topics)) {
            return
        }
        if (foundedFeed?.list?.isTopic[0]?.data) {
            foundedFeed.list.isTopic[0].data = topics
        } else {
            foundedFeed.list.isTopic = [{ data: topics }]
        }
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[index] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide

        try {
            await TopicService.handleTopicToFeedback(idFeedback, topics)
            //loadFeedbacks() //setFeedbacks(tmp) //todo: check if necessary with davide
        } catch (e) {
            dispatch(
                showToast({
                    type: 2,
                    text: t(
                        'Impossibile modificare i topic, riprovare più tardi'
                    ),
                })
            )
            foundedFeed = beforeChangeTopic
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[index] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
        }
    }

    const handleClickChangeSentiment = async (
        sentiment: any,
        index: number
    ) => {
        const idFeedback = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === '_id'
        )?.data
        const idSource = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === 'idSource'
        )?.data
        let foundedFeed = feedbacks[index]

        const beforeChangeSentiment = JSON.parse(
            JSON.stringify(feedbacks[index])
        )
        foundedFeed.integer.isSentiment[0].data = sentiment
        const tmp = JSON.parse(JSON.stringify(feedbacks))
        tmp[index] = foundedFeed
        //setFeedbacks(tmp) //todo: check if necessary with davide
        try {
            await FeedbackService.editFeedbackSentiment(
                idFeedback,
                undefined,
                undefined,
                undefined,
                idSource,
                undefined,
                sentiment,
                foundedFeed
            )
            //loadFeedbacks() //todo: check if necessary with davide
        } catch (e) {
            dispatch(
                showToast({
                    type: 2,
                    text: t(
                        'Impossibile modificare il sentiment, riprovare più tardi'
                    ),
                })
            )
            foundedFeed = beforeChangeSentiment
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[index] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
        }
    }

    const handleChangeAnswer = async (
        ev: any,
        index: number,
        toMod: boolean
    ) => {
        const idFeed = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === '_id'
        )?.data
        const idSource = feedbacks[index]?.string?.constant?.find(
            (elm: any) => elm.col === 'idSource'
        )?.data
        const answerToChange = ev.target?.answerToChange?.value
        let foundedFeed = feedbacks[index]
        const sourceFrom = foundedFeed?.string?.constant?.filter(
            (elm: any) => elm.col === 'sourceFrom'
        )[0]?.data

        const indiceToChange = index
        const beforeChangeAnswer = JSON.parse(JSON.stringify(feedbacks[index]))
        if (!toMod) {
            foundedFeed.string.isAnswer[0].data.text = answerToChange
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[indiceToChange] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
            const urlPart = foundedFeed.string.isAnswer[0]?.data?.urlPart

            try {
                if (sourceFrom === 'FacebookAPI') {
                    await FeedbackService.replyFeedbackFacebook(
                        answerToChange,
                        idFeed,
                        urlPart,
                        idSource,
                        foundedFeed.string.isAnswer[0]?.data?.idSmartResponse
                            ? foundedFeed.string.isAnswer[0]?.data
                                  ?.idSmartResponse
                            : undefined
                    )
                } else if (
                    sourceFrom === 'Trustpilot' &&
                    user?.trustpilotReply
                ) {
                    await ScraperService.replyReviewTrust(
                        answerToChange,
                        idFeed,
                        urlPart,
                        idSource,
                        foundedFeed.string.isAnswer[0]?.data?.idSmartResponse
                            ? foundedFeed.string.isAnswer[0]?.data
                                  ?.idSmartResponse
                            : undefined
                    )
                } else {
                    await FeedbackService.replyFeedbackGoogle(
                        answerToChange,
                        idFeed,
                        urlPart,
                        idSource,
                        foundedFeed.string.isAnswer[0]?.data?.idSmartResponse
                            ? foundedFeed.string.isAnswer[0]?.data
                                  ?.idSmartResponse
                            : undefined
                    )
                }
                //loadFeedbacks() //todo: check if necessary with davide
            } catch (e) {
                dispatch(
                    showToast({
                        type: 2,
                        text: t(
                            'Impossibile aggiungere la risposta, riprovare più tardi'
                        ),
                    })
                )
                foundedFeed = beforeChangeAnswer
                const tmp = JSON.parse(JSON.stringify(feedbacks))
                tmp[indiceToChange] = foundedFeed
                //setFeedbacks(tmp) //todo: check if necessary with davide
            }
        } else {
            foundedFeed.string.isAnswer[0].data.text = answerToChange
            const sourceFrom = foundedFeed?.string?.constant?.filter(
                (elm: any) => elm.col === 'sourceFrom'
            )[0]?.data
            const tmp = JSON.parse(JSON.stringify(feedbacks))
            tmp[indiceToChange] = foundedFeed
            //setFeedbacks(tmp) //todo: check if necessary with davide
            try {
                await FeedbackService.editFeedbackSentiment(
                    idFeed,
                    answerToChange,
                    sourceFrom,
                    foundedFeed.string.isAnswer[0].data.urlPart,
                    idSource,
                    foundedFeed.string.isAnswer[0]?.data?.idSmartResponse
                        ? foundedFeed.string.isAnswer[0]?.data?.idSmartResponse
                        : undefined,
                    undefined,
                    foundedFeed.string.isAnswer[0]?.data?.autoGeneratedGPT
                )
                //loadFeedbacks() //todo: check if necessary with davide
            } catch (e) {
                foundedFeed = beforeChangeAnswer
                const tmp = JSON.parse(JSON.stringify(feedbacks))
                tmp[indiceToChange] = foundedFeed
                //setFeedbacks(tmp) //todo: check if necessary with davide
            }
        }
    }

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

    const trackerData = [
        {
            label: t('Percentuale risposte'),
            displayLabel: '5463',
            value: 5463,
            total: 15000,
        },
        {
            label: t('Percentuale di risposta'),
            displayLabel: (5463 * 100) / 15000 + '%',
            value: (5463 * 100) / 15000,
            total: 15000,
        },
    ]
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
                        <TrackerCard data={trackerData} />
                    </div>
                    <div className={styles.itemContainer}>
                        <TierListCard
                            tierList={tierList}
                            label={t('dei canali con più recensioni')}
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
                        return (
                            <ReviewCard
                                key={idx}
                                index={idx}
                                isFromCompetitor={true}
                                smartResponses={smartResponse}
                                handleClickChangeSentiment={
                                    handleClickChangeSentiment
                                }
                                handleChangeTopic={handleChangeTopic}
                                feedback={feedback}
                            />
                        )
                    })}
                </div>
            </div>
        </PageContainer>
    )
}

export default ReviewsCompetitor
