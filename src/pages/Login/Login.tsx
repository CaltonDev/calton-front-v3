import { setUser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input/Input'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const performLoginAndRedirect = () => {
        dispatch(setUser('exist'))
        navigate('/')
    }

    const handleInputChange = (e: any) => {
        setName(e.target.value)
    }

    return (
        <div>
            <Typography size={'h1'} weight={'normal'} color={'primary'}>
                Login
            </Typography>

            <Input
                size={'medium'}
                color={'success'}
                disabled={true}
                onChange={handleInputChange}
                value={name}
                placeholder={'Inserisci qui il tuo nome...'}
            />
        </div>
    )
}

export default Login
