import styles from './SignUp.module.scss'
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
import FormInputWrapper from '../../components/FormInputWrapper/FormInputWrapper'
import CaltonSelect from '../../components/Select/Select'

function Login() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()
    const lang = i18n.language.includes('-')
        ? i18n.language.split('-')[0]
        : i18n.language

    useEffect(() => {
        sessionStorage.removeItem('unique')
        /*dispatch(setDistribuzioniVoti(null))
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

        dispatch(setLocationFiltered(null))

        dispatch(setSourcesFiltered(null))
        dispatch(setPlatformType('reviews'))*/

        dispatch(setChildUsers(null))
        dispatch(resetSearch())
        dispatch(resetSocketMessage())
        dispatch(resetFilters())
        dispatch(setUser(null))
        dispatch(showToast({ type: 7 }))
    }, [])

    const handleSubmit = async (values: {
        email: string
        password: string
    }) => {
        await SignUp(values.email, values.password)
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

    const SignUp = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            /*const response = await LoginService.login(email, password)
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
            }*/
            //TODO: missing signup api
        } catch (e: any) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    function validateLoginFields(values: string, fieldType: string) {
        if (fieldType === 'email' && !isEmail(values)) {
            return t('Text should be an email')
        }

        if (isWhiteSpaceString(values)) {
            return t('Obbligatorio')
        }

        if (values?.length === 0) {
            return t('Obbligatorio')
        }

        return undefined
    }

    const selectOptions = [
        {
            value: 'it',
            label: 'ITA',
            icon: 'itaFlag.svg',
        },
        {
            value: 'es',
            label: 'ES',
            icon: 'esFlag.svg',
        },
        {
            value: 'en',
            label: 'EN',
            icon: 'enFlag.svg',
        },
    ]

    const handleLanguageChange = (e: any) => {
        console.log('e: ', e)
        window.localStorage.setItem('language', e.value)
        i18n.changeLanguage(e.value)
        //todo: check in future if we need moment or days
        /*if (e.target.value === 'it') {
            moment.updateLocale('it', localization_it)
        } else if (e.target.value === 'es') {
            moment.updateLocale('es', localization_es)
        } else {
            moment.updateLocale('en', localization_en)
        }*/
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <CaltonSelect
                    options={selectOptions}
                    value={
                        selectOptions[
                            selectOptions?.findIndex((x) => x.value === lang)
                        ]
                    }
                    size={'small'}
                    fontSize={'small'}
                    customColor={'none'}
                    customHeight={'auto'}
                    placeholderColor={'black'}
                    onChange={handleLanguageChange}
                    iconOnly={true}
                    iconSize={'large'}
                />
            </div>
            <div className={styles.contentDiv}>
                <div className={styles.leftContainer}></div>
                <div className={styles.rightContainer}>
                    <div className={styles.centerItem}>
                        <img src={logoFull} alt="session-logo" height="110" />
                    </div>
                    <div className={styles.formContainer}>
                        <div>
                            <Typography
                                size={'h1'}
                                weight={'bold'}
                                color={'blue'}
                            >
                                {t('Crea il tuo account')}
                            </Typography>
                            <Typography
                                size={'h5'}
                                weight={'light'}
                                color={'primary'}
                            >
                                {t('Non so se c’è bisogno di un sottotitolo.')}
                            </Typography>
                        </div>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            onSubmit={async (values, actions) => {
                                await handleSubmit(values)
                                actions.setSubmitting(false)
                            }}
                        >
                            {(formikProps) => {
                                return (
                                    <Form
                                        onKeyDown={handleKeyDown}
                                        className={styles.form}
                                    >
                                        <div className={styles.inputDiv}>
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'light'}
                                            >
                                                {t('E-mail') + '*'}
                                            </Typography>
                                            <Field
                                                name="email"
                                                component={FormInputWrapper}
                                                placeholder="Email Name"
                                                formikProps={formikProps}
                                                required={true}
                                                validate={(value: any) =>
                                                    validateLoginFields(
                                                        value,
                                                        'email'
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className={styles.inputDiv}>
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'light'}
                                            >
                                                {t('Password') + '*'}
                                            </Typography>
                                            <Field
                                                name="password"
                                                component={FormInputWrapper}
                                                placeholder="Your Password"
                                                validate={(value: any) =>
                                                    validateLoginFields(
                                                        value,
                                                        'password'
                                                    )
                                                }
                                                required={true}
                                            />
                                        </div>

                                        <div className={styles.centerItemSmall}>
                                            <Button size={'medium'} fullWidth>
                                                {t('Login')}
                                            </Button>
                                            <div className={styles.signUpRow}>
                                                <Typography
                                                    size={'bodyXSmall'}
                                                    weight={'light'}
                                                >
                                                    {t('Hai già un account?')}
                                                </Typography>
                                                <Typography
                                                    size={'bodyXSmall'}
                                                    weight={'light'}
                                                    color={'blue'}
                                                    onClick={() =>
                                                        console.log('clicked')
                                                    }
                                                >
                                                    {t('Login')}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className={styles.divider}>
                                            <div className={styles.line}></div>
                                            <Typography
                                                size={'bodyMedium'}
                                                weight={'bold'}
                                            >
                                                {t('or')}
                                            </Typography>
                                            <div className={styles.line}></div>
                                        </div>
                                        <Button
                                            //onClick={handleSubmit}
                                            size={'medium'}
                                            fullWidth
                                            color={'white'}
                                            customTextColor={'#3F49FC'}
                                            arrowPlacement={'left'}
                                            icon={'Google.svg'}
                                        >
                                            {t('Login con Google')}
                                        </Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
