import styles from './PostPreview.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { btnTypesList, postTypes } from '../../../constants/CustomConstants'
import PostCarousel from '../PostCarousel/PostCarousel'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { PostPreviewProps } from './PostPreview.interface'

function PostPreview({
    post,
    type,
    isCard = false,
    dataReady = true,
    isFromGrid = false,
    showMore = false,
}: PostPreviewProps) {
    const { t, i18n } = useTranslation()
    const [showTerms, setShowTerms] = useState(false)

    const getMonthName = (monthNumber: number) => {
        const date = new Date()
        date.setMonth(monthNumber - 1)

        return date.toLocaleString(i18n.language, { month: 'long' })
    }

    const formatDayTimePost = () => {
        const firstDay = !post?.event?.schedule?.startDate
            ? new Date().getDate() +
              ' ' +
              getMonthName(new Date().getMonth() + 1)
            : post?.event?.schedule?.startDate?.day +
              ' ' +
              getMonthName(post?.event?.schedule?.startDate?.month)
        const lastDay = !post?.event?.schedule?.endDate
            ? new Date().getDate() +
              ' ' +
              getMonthName(new Date().getMonth() + 2)
            : post?.event?.schedule?.endDate?.day +
              ' ' +
              getMonthName(post?.event?.schedule?.endDate?.month)
        let firstTime =
            post?.event?.schedule?.startTime?.hours +
            ':' +
            post?.event?.schedule?.startTime?.minutes
        let lastTime =
            post?.event?.schedule?.endTime?.hours +
            ':' +
            post?.event?.schedule?.endTime?.minutes

        if (
            !post?.event?.schedule?.startTime ||
            Object?.keys(post?.event?.schedule?.startTime)?.length === 0 ||
            !post?.event?.schedule?.startTime?.hours ||
            !post?.event?.schedule?.startTime?.minutes
        ) {
            firstTime = '00:00'
        }

        if (
            !post?.event?.schedule?.endTime ||
            Object?.keys(post?.event?.schedule?.endTime)?.length === 0 ||
            !post?.event?.schedule?.endTime?.hours ||
            !post?.event?.schedule?.endTime?.minutes
        ) {
            lastTime = '00:00'
        }

        let formatted_label = firstDay + ' - ' + lastDay

        if (type === 'EVENT') {
            formatted_label =
                firstDay + ', ' + firstTime + ' - ' + lastDay + ', ' + lastTime
        }

        if (type === 'STANDARD') formatted_label = firstDay

        return formatted_label
    }

    const formatCouponDates = () => {
        const defaultStartDate = new Date().toLocaleDateString('en-GB')
        const defaultEndDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
        ).toLocaleDateString('en-GB')

        const startDate = !post?.event?.schedule?.startDate
            ? defaultStartDate
            : post?.event?.schedule?.startDate?.day +
              '/' +
              post?.event?.schedule?.startDate?.month +
              '/' +
              post?.event?.schedule?.startDate?.year
        const endDate = !post?.event?.schedule?.endDate
            ? defaultEndDate
            : post?.event?.schedule?.endDate?.day +
              '/' +
              post?.event?.schedule?.endDate?.month +
              '/' +
              post?.event?.schedule?.endDate?.year

        return startDate + ' - ' + endDate
    }

    const [imgFromApiObj, setImgFromApiObj] = useState(
        post?.media?.length > 0 ? [{ data_url: post?.media[0]?.googleUrl }] : []
    )

    const validateUrlText = (str: string) => {
        let formattedText = str
        if (!str?.includes('http://') && !str?.includes('https://')) {
            formattedText = 'https://' + str
        }

        return formattedText
    }

    const btnLabel = btnTypesList.find(
        (btnType) => btnType.value === post?.callToAction?.actionType
    )?.label

    const postTypeLabel = postTypes?.find(
        (obj) => obj?.value === type
    )?.labelValue

    return (
        <>
            {!dataReady ? (
                {
                    /*<div>
                    <LoaderChart type={'postRecap'} />
                </div>*/
                }
            ) : (
                <div
                    className={
                        isCard
                            ? styles.containerEditInfoCard
                            : styles.containerEditInfo
                    }
                >
                    <div
                        className={
                            isCard
                                ? styles.cardContainer
                                : styles.cardContainerFullView
                        }
                    >
                        <div className={styles.flexColumn}>
                            <span className={styles.titleHeader}>
                                {post?.locationName}
                            </span>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <SvgWrapper
                                    customHeight={24}
                                    customWidth={24}
                                    keySvg={'calendar.svg'}
                                    color={'black'}
                                />
                                <span className={styles.daytime}>
                                    {formatDayTimePost()}
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', marginTop: 30 }}>
                            <div
                                className={
                                    !imgFromApiObj?.length ||
                                    imgFromApiObj[0]?.data_url === undefined
                                        ? styles.containerInputPlaceholder
                                        : styles.containerInput
                                }
                            >
                                <PostCarousel
                                    imgFromApi={imgFromApiObj}
                                    isPreview={true}
                                    label={
                                        postTypeLabel ? t(postTypeLabel) : ''
                                    }
                                    isFromGrid={isFromGrid}
                                />
                            </div>
                        </div>
                        {type !== 'STANDARD' && (
                            <div
                                className={styles.flexColumn}
                                style={{ marginTop: 20 }}
                            >
                                <span className={styles.title}>
                                    {post?.event?.title}
                                </span>
                            </div>
                        )}
                        {post?.media?.length > 0 && (
                            <div style={{ marginTop: 20, width: 310 }}>
                                <span className={styles.description}>
                                    {post?.media?.length > 0 &&
                                        post?.media[0]?.description}
                                </span>
                            </div>
                        )}
                        {type === 'OFFER' && showMore && (
                            <>
                                <div className={styles.flexColumn}>
                                    <span className={styles.description}>
                                        {post?.summary}
                                    </span>
                                    <a
                                        type="link"
                                        href={validateUrlText(
                                            post?.offer?.redeemOnlineUrl
                                                ? post?.offer?.redeemOnlineUrl
                                                : ''
                                        )}
                                        target={'_blank'}
                                        className={styles.link}
                                    >
                                        <span
                                            style={{
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {t('UTILIZZA ONLINE')}
                                        </span>
                                    </a>
                                </div>
                                <div className={styles.flexColumn}>
                                    <div className={styles.coupon}>
                                        <span
                                            className={styles.daytime}
                                            style={{ textAlign: 'center' }}
                                        >
                                            {t(
                                                'Mostra questo codice in negozio'
                                            )}
                                        </span>
                                        <span className={styles.title}>
                                            {post?.offer?.couponCode}
                                        </span>
                                        <div
                                            className={styles.flexColumn}
                                            style={{ alignItems: 'center' }}
                                        >
                                            <span className={styles.daytime}>
                                                {t('Periodo di validità') + ':'}
                                            </span>
                                            <span className={styles.daytime}>
                                                {formatCouponDates()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {post?.offer?.termsConditions && (
                                    <div className={styles.flexColumn}>
                                        <div style={{ marginTop: 20 }}>
                                            <span
                                                className={styles.daytime}
                                                onClick={() =>
                                                    setShowTerms(!showTerms)
                                                }
                                            >
                                                {t('Termini e condizioni')}
                                            </span>
                                            {!showTerms ? (
                                                <RightOutlined
                                                    style={{
                                                        verticalAlign: 'middle',
                                                    }}
                                                />
                                            ) : (
                                                <DownOutlined
                                                    style={{
                                                        verticalAlign: 'middle',
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {showTerms && (
                                            <span
                                                className={styles.daytime}
                                                style={{ marginBottom: 20 }}
                                            >
                                                {post?.offer?.termsConditions}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                        <div className={styles.infoBtnContainer}>
                            {post?.callToAction &&
                                post?.callToAction?.actionType !==
                                    'ACTION_TYPE_UNSPECIFIED' && (
                                    <a
                                        href={validateUrlText(
                                            post?.callToAction?.url
                                        )}
                                        target={'_blank'}
                                        className={styles.infoBtn}
                                        type="primary"
                                        rel="noreferrer"
                                    >
                                        {btnLabel ? t(btnLabel) : ''}
                                    </a>
                                )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PostPreview
