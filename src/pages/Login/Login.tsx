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

function Login() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()

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

                console.log('Response: ', response)
                dispatch(setUser(response))
                if (response.user.isFirstAccess) {
                    history('/integrazioniOnboarding')
                } else {
                    history('/')
                }
            }
        } catch (e: any) {
            console.log(e.response)
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
