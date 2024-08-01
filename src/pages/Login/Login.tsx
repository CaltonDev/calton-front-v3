import styles from './Login.module.scss'
import React from 'react'
import LoginService from '../../services/LoginService'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import AppConfig from '../../constants/AppConfig'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import CaltonLogoWh from '../../assets/img/Logo Calton Mascotte.png'
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

function Login() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        sessionStorage.removeItem('unique')
        dispatch(setDistribuzioniVoti(null))
        dispatch(setDistribuzioniRacc(null))
        dispatch(setAverageVotoByTime(null))
        dispatch(setAverageSentimentByTime(null))
        dispatch(setAverageReviewByTime(null))
        dispatch(setSources(null))
        dispatch(setBubbles(null))
        dispatch(setMenusList([]))
        dispatch(
            setSelectedWord({
                word: null,
                sentiment: false,
                isText: false,
            })
        )
        dispatch(setWordSearched(null))
        dispatch(setFeedbacks(null))
        dispatch(setFeedbacksCount(0))
        dispatch(setAllChannelSources(null))
        dispatch(setAllProducts(null))
        dispatch(setAllLocations(null))
        dispatch(setAllTopics(null))
        dispatch(resetSearch())
        dispatch(setLocationFiltered(null))
        dispatch(setChildUsers(null))
        dispatch(setSourcesFiltered(null))
        dispatch(setPlatformType('reviews'))
        dispatch(setDistribuzioneTopicPerSentiment(null))
        dispatch(setVotoMedioTopic(null))
        dispatch(setShowNumbers(false))
        dispatch(setCurrentToasts([]))
        dispatch(resetFilters())
        dispatch(resetSocketMessage())
        dispatch(setUser(null))
        dispatch(showToast({ type: 7 }))
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await login()
    }

    const changeEmail = (e: any) => {
        setEmail(e.target.value)
    }
    const changePwd = (e: any) => {
        setPassword(e.target.value)
    }

    const changeLanguage = (lang: string) => {
        window.localStorage.setItem('language', lang)
        try {
            i18n.changeLanguage(lang)
        } catch (e) {
            console.log('Error: ', e)
        }

        if (lang === 'it') {
            moment.locale('it')
        } else if (lang === 'es') {
            moment.locale('es')
        } else {
            moment.locale('en')
        }
    }

    const login = async () => {
        setIsLoading(true)
        try {
            const response = await LoginService.login(email, password)
            if (response) {
                const id = uuidv5(
                    response.user.token + new Date().toString(),
                    AppConfig.namespace
                )
                sessionStorage.setItem('unique', id)
                const userLanguage = response?.user?.lang
                changeLanguage(userLanguage)
                dispatch(setUser(response))
                if (response.user.isFirstAccess) {
                    history('/integrazioniOnboarding')
                } else {
                    history('/home')
                }
            }
        } catch (e: any) {
            console.log(e)
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.primaryBackground}>
            <div className={styles.centerItem}>
                <img src={CaltonLogoWh} alt="session-logo" height="150" />
            </div>
            <div className={styles.centerItem}>
                <p className={styles.headerLogin}>
                    <b>{t('Bentornato')}</b>
                </p>
                <Input
                    value={email}
                    //style={{ marginTop: '35px' }}
                    //iconName={<GoMail style={{ fontSize: '1.25rem' }} />}
                    placeholder={'Email'}
                    //onKeyDown={handleKeyDown}
                    onChange={changeEmail}
                />
                <Input
                    value={password}
                    type={'password'}
                    //iconName={<MdOutlineLock style={{ fontSize: '1.25rem' }} />}
                    placeholder={'Password'}
                    //onKeyDown={handleKeyDown}
                    onChange={changePwd}
                />
                <div className={styles.recoverPasswordWrapper}>
                    <span className={styles.recoverPassword}>
                        {t('Password dimenticata')}?
                    </span>
                </div>
                <div className={styles.centerItemSmall}>
                    <Button onClick={handleSubmit} size={'small'}>
                        {t('Login')}
                    </Button>
                    <Button
                        onClick={() =>
                            history('register', { state: { fromButton: true } })
                        }
                        size={'small'}
                    >
                        {t('Registrati')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
