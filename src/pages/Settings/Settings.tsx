import styles from './Settings.module.scss'
import React, { useEffect, useState } from 'react'
import LoginService from '../../services/LoginService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import AppConfig from '../../constants/AppConfig'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import logoFull from '../../assets/img/logo-full.png'
import moment from 'moment'
import { setDistribuzioniVoti } from '../../store/home/distribuzioneVotiSlice'
import { setDistribuzioniRacc } from '../../store/home/distribuzioneRaccomandazioni'
import { setAverageVotoByTime } from '../../store/home/averageVotoByTimeSlice'
import { setAverageSentimentByTime } from '../../store/home/averageSentimentByTime'
import { setAverageReviewByTime } from '../../store/home/averageReviewByTime'
import { setSources } from '../../store/home/sourceSlice'
import { setBubbles } from '../../store/home/bubbleSlice'
import { setMenusList } from '../../store/menus/menuSlice'
import { setSelectedWord } from '../../store/home/selectedWordsSlice'
import { resetSearch, setWordSearched } from '../../store/search/search'
import {
    setFeedbacks,
    setFeedbacksCount,
} from '../../store/home/feedbackHomeSlice'
import {
    setAllChannelSources,
    setAllLocations,
    setAllProducts,
    setAllTopics,
} from '../../store/filters/selectableFiltersSlice'
import { setLocationFiltered } from '../../store/locations/locationFilteredSlice'
import { setChildUsers } from '../../store/childUsers/childUsersSlice'
import { setSourcesFiltered } from '../../store/sources/sourcesFilteredSlice'
import {
    setPlatformType,
    setShowNumbers,
} from '../../store/settings/settingsSlice'
import {
    setDistribuzioneTopicPerSentiment,
    setVotoMedioTopic,
} from '../../store/analisiAvanzataState/analisiAvanzataSlice'
import { setCurrentToasts, showToast } from '../../store/toast/errorToastSlice'
import { resetFilters } from '../../store/filters/filtersSlice'
import { resetSocketMessage } from '../../store/socket/socketSlice'
import Typography from '../../components/Typography/Typography'
import { Field, Formik } from 'formik'
import { Form } from 'formik-antd'
import { isEmail, isWhiteSpaceString } from '../../helpers/helpers'
import Checkbox from '../../components/Checkbox/Checkbox'
import FormInputWrapper from '../../components/FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import CaltonSelect from '../../components/Select/Select'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'
import PageHeader from '../../components/PageComponents/PageHeader/PageHeader'
import PageContainer from '../../components/PageComponents/PageContainer/PageContainer'
import SvgWrapper from '../../components/SvgWrapper/SvgWrapper'
import DownloadIcon from '../../components/DownloadIcon/DownloadIcon'

function Settings() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const history = useNavigate()
    const [activeSection, setActiveSection] = useState(0)
    const sectionData = [
        {
            key: 'account',
            label: t('Gestisci account'),
            displayLabel: t('account'),
        },
        {
            key: 'smart_response',
            label: t('Smart response'),
            displayLabel: t('smart response'),
        },
        {
            key: 'gruppi',
            label: t('Gestisci gruppi'),
            displayLabel: t('gruppo'),
        },
        {
            key: 'report',
            label: t('Gestitsci report'),
            displayLabel: t('report'),
        },
    ]

    return (
        <PageContainer>
            <PageHeader
                heading={t('Impostazioni')}
                subheading={true}
                hideFilters={true}
            ></PageHeader>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.leftItemContainer}>
                        {sectionData?.map((obj, idx) => {
                            return (
                                <div
                                    key={obj?.key}
                                    onClick={() => setActiveSection(idx)}
                                    className={
                                        idx === activeSection
                                            ? styles.headerLabelContainer
                                            : styles.headerLabelContainerDisabled
                                    }
                                >
                                    <Typography
                                        size={'bodyBig'}
                                        weight={'normal'}
                                        color={
                                            idx === activeSection
                                                ? 'settings'
                                                : 'grey'
                                        }
                                    >
                                        {obj?.label}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.contentDiv}></div>
                    <div className={styles.placeholder}>
                        <div className={styles.placeholderText}>
                            <p>
                                <Typography
                                    size={'h4'}
                                    weight={'normal'}
                                    useSpan={true}
                                >
                                    {t('Seleziona un')}
                                </Typography>
                                <Typography
                                    size={'h4'}
                                    weight={'bold'}
                                    useSpan={true}
                                >
                                    {sectionData[activeSection]?.key}
                                </Typography>
                                <Typography
                                    size={'h4'}
                                    weight={'normal'}
                                    useSpan={true}
                                >
                                    {t('per visualizzare le informazioni.')}
                                </Typography>
                            </p>
                        </div>
                        <div className={styles.placeholderContent}>
                            <div>
                                <div className={styles.leftItem}>
                                    <div className={styles.bar} />
                                    <div className={styles.bar} />
                                    <div className={styles.bar} />
                                    <div className={styles.bar} />
                                </div>
                            </div>
                            <div className={styles.rightItem}>
                                <div className={styles.smallBar} />
                                <div className={styles.barContainer}>
                                    <div className={styles.smallBar} />
                                    <div className={styles.smallBar} />
                                </div>
                                <div className={styles.barContainer}>
                                    <div className={styles.smallBar} />
                                    <div className={styles.smallBar} />
                                </div>
                                <div className={styles.barContainer}>
                                    <div className={styles.smallBar} />
                                    <div className={styles.smallBar} />
                                </div>
                                <div className={styles.barContainer}>
                                    <div className={styles.smallestBar} />
                                    <div className={styles.smallestBar} />
                                    <div className={styles.smallestBar} />
                                    <div className={styles.smallestBar} />
                                </div>
                                <div className={styles.smallestBar} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Settings
