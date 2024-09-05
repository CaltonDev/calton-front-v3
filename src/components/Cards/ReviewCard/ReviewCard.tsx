import React, { useState } from 'react'
import styles from './ReviewCard.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Tag from '../../Tag/Tag'
import TextContainer from '../../TextContainer/TextContainer'
import Button from '../../Button/Button'
import Select from '../../Select/Select'
import CaltonSelect from '../../Select/Select'
import { getBackgroundColor } from '../../../utils/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Textarea from '../../Textarea/Textarea'
import Hooks from '../../../utils/hooks/Hooks'
import { ReviewCardProps } from './ReviewCard.interface'
import moment from 'moment'
import ShowMoreText from 'react-show-more-text'

function ReviewCard({ feedback }: ReviewCardProps) {
    const { t } = useTranslation()
    const sentiment =
        feedback?.integer?.isSentiment &&
        feedback?.integer?.isSentiment[0]?.data != null
            ? feedback?.integer?.isSentiment[0]?.data
            : 0
    const recensione = feedback?.string?.toAnalyse

    const [replyMessage, setReplyMessage] = useState<string>()
    const [showTextarea, setShowTextarea] = useState(false)
    const selectOptions = [
        {
            value: 1,
            label: t('Sentiment'),
            icon: 'positiveSentiment.svg',
        },
        {
            value: 0,
            label: t('Sentiment'),
            icon: 'neutralSentiment.svg',
        },
        {
            value: -1,
            label: t('Sentiment'),
            icon: 'negativeSentiment.svg',
        },
    ]

    const handleSentimentChange = () => {
        console.log('Ciao')
    }

    const handleClickOutside = () => {
        setShowTextarea(false)
    }
    const ref = Hooks.useOutsideClick(handleClickOutside)

    const sourceName = feedback?.string?.constant?.filter(
        (elm: any) => elm.col === 'sourceName'
    )[0]

    const openInNewPage = () => {
        if (
            !sourceName.data.includes('GoogleMyBusinessAPI') &&
            !sourceName.data.includes('Google Reviews') &&
            feedback?.string?.isUrl
        )
            window.open(feedback?.string?.isUrl[0]?.data, '_blank')
    }

    return (
        <div className={styles.container}>
            <div className={styles.paddedContainer}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            {!feedback?.obj?.isReviewer[0]?.data?.photoUrl ? (
                                <div className={styles.placeholderImg} />
                            ) : (
                                <img
                                    src={
                                        feedback?.obj?.isReviewer[0]?.data
                                            ?.photoUrl
                                    }
                                    className={styles.placeholderImg}
                                />
                            )}
                            <Typography size={'bodySmall'} weight={'light'}>
                                {
                                    feedback?.string?.constant?.filter(
                                        (elm: any) =>
                                            elm.col === 'formatted_address'
                                    )[0]?.data
                                }
                            </Typography>
                        </div>
                        <SvgWrapper
                            keySvg={'openInNewPageIcon.svg'}
                            size={'small'}
                            onClick={openInNewPage}
                        />
                    </div>
                    <div className={styles.contentDiv}>
                        <div className={styles.tagsContainer}>
                            <div className={styles.leftItem}>
                                {feedback?.list?.isTopic &&
                                    feedback?.list?.isTopic.map((elm: any) => {
                                        if (elm.data) {
                                            return elm.data?.map(
                                                (topic: any, idx: number) => (
                                                    <TextContainer
                                                        key={idx}
                                                        label={topic?.name}
                                                        color={'#0C14A1'}
                                                    />
                                                )
                                            )
                                        }
                                    })}
                            </div>
                            <div>
                                <Button
                                    size={'small'}
                                    fullWidth={true}
                                    customPadding={'7px 16px'}
                                >
                                    {t('Gestisci topic')}
                                </Button>
                            </div>
                        </div>
                        <div className={styles.tagsContainer}>
                            <div className={styles.leftItem}>
                                <TextContainer
                                    label={moment
                                        .utc(
                                            feedback?.datetime
                                                ?.isDataFeedback[0]
                                        )
                                        .format('DD/MM/YYYY')}
                                    textColor={'black'}
                                    color={'#F1F1F1'}
                                    iconSvg={'Amazon.svg'}
                                />
                                {/*Add review stars*/}
                                <TextContainer
                                    isRating={
                                        feedback?.integer?.isRating[0]?.data
                                    }
                                    color={'#F1F1F1'}
                                />
                            </div>
                            <CaltonSelect
                                options={selectOptions}
                                value={
                                    selectOptions[
                                        selectOptions?.findIndex(
                                            (x) => x.value === sentiment
                                        )
                                    ]
                                }
                                size={'small'}
                                fontSize={'small'}
                                customColor={'none'}
                                customHeight={'auto'}
                                placeholderColor={'black'}
                                onChange={handleSentimentChange}
                            />
                        </div>
                        <div className={styles.reviewContainer}>
                            <div className={styles.title}>
                                {!feedback?.obj?.isReviewer[0]?.data
                                    ?.photoUrl ? (
                                    <div className={styles.placeholderImg} />
                                ) : (
                                    <img
                                        src={
                                            feedback?.obj?.isReviewer[0]?.data
                                                ?.photoUrl
                                        }
                                        className={styles.placeholderImg}
                                    />
                                )}
                                <Typography size={'bodyMedium'} weight={'bold'}>
                                    {feedback?.obj?.isReviewer[0]?.data?.name}
                                </Typography>
                            </div>
                            <div className={styles.reviewContainer}>
                                {recensione &&
                                    recensione[0]?.data &&
                                    recensione[0]?.data != '' && (
                                        <ShowMoreText
                                            lines={2}
                                            className={styles.fontW}
                                            more={
                                                <Typography
                                                    size={'bodySmall'}
                                                    weight={'light'}
                                                    color={'blue'}
                                                >
                                                    {t('mostra tutto')}
                                                </Typography>
                                            }
                                            less={
                                                <Typography
                                                    size={'bodySmall'}
                                                    weight={'light'}
                                                    color={'blue'}
                                                >
                                                    {t('nascondi')}
                                                </Typography>
                                            }
                                        >
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'light'}
                                            >
                                                {recensione[0]?.data}
                                            </Typography>
                                        </ShowMoreText>
                                    )}
                            </div>
                            {feedback?.string?.isAnswer &&
                                feedback?.string?.isAnswer[0]?.data?.text &&
                                feedback?.string?.isAnswer[0]?.data?.text !=
                                    '' && (
                                    <div className={styles.reviewReply}>
                                        <Typography
                                            size={'bodyMedium'}
                                            weight={'bold'}
                                            color={'green'}
                                        >
                                            {t('Risposta')}
                                        </Typography>
                                        <Typography
                                            size={'bodyMedium'}
                                            weight={'bold'}
                                            color={'grey'}
                                        >
                                            {
                                                feedback?.string?.isAnswer[0]
                                                    ?.data?.text
                                            }
                                        </Typography>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                {!showTextarea && (
                    <div className={styles.footer}>
                        <Tag
                            label={
                                feedback?.string?.isAnswer &&
                                feedback?.string?.isAnswer[0]?.data?.text &&
                                feedback?.string?.isAnswer[0]?.data?.text != ''
                                    ? t('Risposta')
                                    : t('Senza risposta')
                            }
                            type={
                                feedback?.string?.isAnswer &&
                                feedback?.string?.isAnswer[0]?.data?.text &&
                                feedback?.string?.isAnswer[0]?.data?.text != ''
                                    ? 'positive'
                                    : 'neutral'
                            }
                            iconSvg={'reply.svg'}
                        />
                        <SvgWrapper
                            disabled={
                                !(
                                    feedback?.string?.isAnswer &&
                                    feedback?.string?.isAnswer[0]?.data?.text &&
                                    feedback?.string?.isAnswer[0]?.data?.text !=
                                        ''
                                )
                            }
                            keySvg={'message.svg'}
                            size={'small'}
                            color={'secondary'}
                            hasContainerProps={{
                                hasContainer: true,
                                containerSize: 32,
                                border: '2px solid #3F49FC',
                                outlined: true,
                            }}
                            onClick={() => setShowTextarea(true)}
                        />
                    </div>
                )}
            </div>
            {showTextarea && (
                <div className={styles.textareaContainer}>
                    <div className={styles.labelContainer}>
                        <Typography
                            size={'bodyXSmall'}
                            weight={'bold'}
                            color={'blue'}
                        >
                            {t('Risposta')}
                        </Typography>
                    </div>
                    <div ref={ref}>
                        <Textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            rows={5}
                            fullWidth={true}
                            icon={'sendIcon.svg'}
                            placeholder={t('Rispondi...')}
                            customPadding={'100px'}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReviewCard
