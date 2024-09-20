import styles from './CompleteSignUp.module.scss'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import logoFull from '../../assets/img/logo-full.png'
import { resetSearch } from '../../store/search/search'
import { setChildUsers } from '../../store/childUsers/childUsersSlice'
import { showToast } from '../../store/toast/errorToastSlice'
import { resetFilters } from '../../store/filters/filtersSlice'
import { resetSocketMessage } from '../../store/socket/socketSlice'
import Typography from '../../components/Typography/Typography'
import { Field, Formik } from 'formik'
import { Form } from 'formik-antd'
import { isEmail, isWhiteSpaceString } from '../../helpers/helpers'
import FormInputWrapper from '../../components/FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import FormSelectWrapper from '../../components/FormFieldsWrapper/FormSelectWrapper/FormSelectWrapper'
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect'
import { handleKeyDown } from '../../utils/utils'

function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()
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
        name: string
        lastname: string
        company: string
        address: string
        sector: string
        businessType: string
        shoppingPoints: string
    }) => {
        await CompleteSignUp(values)
    }

    const CompleteSignUp = async (values: {
        name: string
        lastname: string
        company: string
        address: string
        sector: string
        businessType: string
        shoppingPoints: string
    }) => {
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
            //TODO: missing complete signup api + select options
        } catch (e: any) {
            console.log(e)
        }
        setIsLoading(false)
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

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <LanguageSelect />
            </div>
            <div className={styles.contentDiv}>
                <div className={styles.centerItem}>
                    <img src={logoFull} alt="session-logo" height="110" />
                </div>
                <div className={styles.formContainer}>
                    <div>
                        <Typography size={'h1'} weight={'bold'} color={'blue'}>
                            {t('Completa il tuo account')}
                        </Typography>
                        <Typography
                            size={'h5'}
                            weight={'light'}
                            color={'primary'}
                        >
                            {t('Non so se c’è bisogno di un sottotitolo.')}
                        </Typography>
                    </div>
                </div>
                <div className={styles.bodyDiv}>
                    <Formik
                        initialValues={{
                            name: '',
                            lastname: '',
                            company: '',
                            address: '',
                            sector: '',
                            businessType: '',
                            shoppingPoints: '',
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
                                    <div className={styles.bodyDiv}>
                                        <div className={styles.bodyContainer}>
                                            <Typography
                                                size={'bodyMedium'}
                                                weight={'bold'}
                                            >
                                                {t('Informazioni personali')}
                                            </Typography>
                                            <div className={styles.inputDiv}>
                                                <Typography
                                                    size={'bodySmall'}
                                                    weight={'light'}
                                                >
                                                    {t('Name') + '*'}
                                                </Typography>
                                                <Field
                                                    name="email"
                                                    component={FormInputWrapper}
                                                    placeholder={t('Your name')}
                                                    formikProps={formikProps}
                                                    required={true}
                                                    validate={(value: any) =>
                                                        validateLoginFields(
                                                            value,
                                                            'name'
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className={styles.inputDiv}>
                                                <Typography
                                                    size={'bodySmall'}
                                                    weight={'light'}
                                                >
                                                    {t('Cognome') + '*'}
                                                </Typography>
                                                <Field
                                                    name="password"
                                                    component={FormInputWrapper}
                                                    placeholder={t(
                                                        'Your lastname'
                                                    )}
                                                    validate={(value: any) =>
                                                        validateLoginFields(
                                                            value,
                                                            'lastname'
                                                        )
                                                    }
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.containerRight}>
                                            <div
                                                className={styles.bodyContainer}
                                            >
                                                <Typography
                                                    size={'bodyMedium'}
                                                    weight={'bold'}
                                                >
                                                    {t(
                                                        'Informazioni aziendali'
                                                    )}
                                                </Typography>
                                                <div
                                                    className={styles.inputDiv}
                                                >
                                                    <Typography
                                                        size={'bodySmall'}
                                                        weight={'light'}
                                                    >
                                                        {t(
                                                            "Nome dell'azienda"
                                                        ) + '*'}
                                                    </Typography>
                                                    <Field
                                                        name="company"
                                                        component={
                                                            FormInputWrapper
                                                        }
                                                        placeholder={t(
                                                            'Company name'
                                                        )}
                                                        formikProps={
                                                            formikProps
                                                        }
                                                        required={true}
                                                        validate={(
                                                            value: any
                                                        ) =>
                                                            validateLoginFields(
                                                                value,
                                                                'company'
                                                            )
                                                        }
                                                    />
                                                </div>
                                                {/*TODO: add google custom autocomplete*/}
                                                <div
                                                    className={styles.inputDiv}
                                                >
                                                    <Typography
                                                        size={'bodySmall'}
                                                        weight={'light'}
                                                    >
                                                        {t('Address') + '*'}
                                                    </Typography>
                                                    <Field
                                                        name="address"
                                                        component={
                                                            FormInputWrapper
                                                        }
                                                        placeholder={t(
                                                            'Company address'
                                                        )}
                                                        validate={(
                                                            value: any
                                                        ) =>
                                                            validateLoginFields(
                                                                value,
                                                                'address'
                                                            )
                                                        }
                                                        required={true}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.inputDivRow
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.inputDiv
                                                        }
                                                        style={{ width: '33%' }}
                                                    >
                                                        <Typography
                                                            size={'bodySmall'}
                                                            weight={'light'}
                                                        >
                                                            {t('Settore') + '*'}
                                                        </Typography>
                                                        <Field
                                                            customBorderColor={
                                                                '#9D96A5'
                                                            }
                                                            name="sector"
                                                            component={
                                                                FormSelectWrapper
                                                            }
                                                            formikProps={
                                                                formikProps
                                                            }
                                                            required={true}
                                                            validate={(
                                                                value: any
                                                            ) =>
                                                                validateLoginFields(
                                                                    value,
                                                                    'sector'
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.inputDiv
                                                        }
                                                        style={{ width: '33%' }}
                                                    >
                                                        <Typography
                                                            size={'bodySmall'}
                                                            weight={'light'}
                                                        >
                                                            {t(
                                                                'Tipologia di Business'
                                                            ) + '*'}
                                                        </Typography>
                                                        <Field
                                                            name="businessType"
                                                            customBorderColor={
                                                                '#9D96A5'
                                                            }
                                                            component={
                                                                FormSelectWrapper
                                                            }
                                                            formikProps={
                                                                formikProps
                                                            }
                                                            required={true}
                                                            validate={(
                                                                value: any
                                                            ) =>
                                                                validateLoginFields(
                                                                    value,
                                                                    'businessType'
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.inputDiv
                                                        }
                                                        style={{ width: '33%' }}
                                                    >
                                                        <Typography
                                                            size={'bodySmall'}
                                                            weight={'light'}
                                                        >
                                                            {t(
                                                                'Numero di punti vendita'
                                                            ) + '*'}
                                                        </Typography>
                                                        <Field
                                                            name="shoppingPoints"
                                                            customBorderColor={
                                                                '#9D96A5'
                                                            }
                                                            component={
                                                                FormSelectWrapper
                                                            }
                                                            formikProps={
                                                                formikProps
                                                            }
                                                            required={true}
                                                            validate={(
                                                                value: any
                                                            ) =>
                                                                validateLoginFields(
                                                                    value,
                                                                    'shoppingPoints'
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={
                                                    styles.centerItemSmall
                                                }
                                            >
                                                <Button
                                                    size={'medium'}
                                                    fullWidth
                                                >
                                                    {t('Registrati')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
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
