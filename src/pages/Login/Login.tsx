import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React from 'react'
import Typography from '../../components/Typography/Typography'
import Button from '../../components/Button/Button'

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

            <Button
                size={'medium'}
                variant={'solid'}
                disabled={false}
                onClick={performLoginAndRedirect}
                arrowPlacement={'right'}
            >
                Login
            </Button>
        </div>
    )
}

export default Login
