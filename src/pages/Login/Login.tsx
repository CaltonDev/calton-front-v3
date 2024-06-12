import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React from 'react'
import styles from './Login.module.scss'
import Typography from '../../components/Typography/Typography'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const performLoginAndRedirect = () => {
        dispatch(setUser('exist'))
        navigate('/')
    }

    return (
        <div>
            <Typography size={'h1'} weight={'normal'} color={'primary'}>
                Login
            </Typography>

            <button
                className={styles.buttonColor}
                type={'button'}
                onClick={performLoginAndRedirect}
            >
                Login
            </button>
        </div>
    )
}

export default Login
