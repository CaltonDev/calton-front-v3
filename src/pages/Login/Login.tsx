import styles from './Login.module.scss'
import React, { useEffect, useState } from 'react'
import LoginService from '../../services/LoginService'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { v5 as uuidv5 } from 'uuid'
import AppConfig from '../../constants/AppConfig'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
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
import { Form, FormItem } from 'formik-antd'
import { isEmail, isWhiteSpaceString } from '../../helpers/helpers'
import Checkbox from '../../components/Checkbox/Checkbox'

function Login() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
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

    const handleSubmit = async (values: {
        email: string
        password: string
    }) => {
        await login(values.email, values.password)
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

    const login = async (email: string, password: string) => {
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

    const CustomInputComponent = ({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors, formikProps }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        ...props
    }: {
        field: any
        form: any
    }) => {
        useEffect(() => {
            formikProps?.setFieldValue(field.name, field.value)
            formikProps?.setFieldTouched(field.name, true)
        }, [field.value])

        return (
            <div>
                <Input {...field} {...props} />
                {touched[field.name] && errors[field.name] && (
                    <Typography
                        size={'bodySmall'}
                        weight={'normal'}
                        customTextColor={'#FF3739'}
                    >
                        {errors[field.name]}
                    </Typography>
                )}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}></div>
            <div className={styles.rightContainer}>
                <div className={styles.centerItem}>
                    <img src={logoFull} alt="session-logo" height="110" />
                </div>
                <div className={styles.formContainer}>
                    <div>
                        <Typography size={'h1'} weight={'bold'} color={'blue'}>
                            {t('Accedi')}
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
                                            {t('E-mail')}
                                        </Typography>
                                        <Field
                                            name="email"
                                            component={CustomInputComponent}
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
                                    <div>
                                        <Typography
                                            size={'bodySmall'}
                                            weight={'light'}
                                        >
                                            {t('Password')}
                                        </Typography>
                                        <Field
                                            name="password"
                                            component={CustomInputComponent}
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

                                    <div className={styles.recoverPasswordDiv}>
                                        <Checkbox
                                            title={t('Ricorda password')}
                                        />
                                        <Typography
                                            size={'bodySmall'}
                                            weight={'bold'}
                                            color={'blue'}
                                        >
                                            {t('Password dimenticata')}
                                        </Typography>
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
                                                {t(
                                                    'Non sei ancora registrato?'
                                                )}
                                            </Typography>
                                            <Typography
                                                size={'bodyXSmall'}
                                                weight={'light'}
                                                color={'blue'}
                                                onClick={() =>
                                                    console.log('clicked')
                                                }
                                            >
                                                {t('Registrati qui')}
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
    )
}

export default Login
