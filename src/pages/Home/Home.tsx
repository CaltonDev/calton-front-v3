import styles from './Home.module.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input/Input'
import Checkbox from '../../components/Checkbox/Checkbox'
import Switch from '../../components/Switch/Switch'
import CaltonSelect from '../../components/Select/Select'
import SvgWrapper from '../../components/SvgWrapper/SvgWrapper'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [btnType, setBtnType] = useState<'text' | 'password'>('password')
    const [checked, setChecked] = useState(false)
    const performLoginAndRedirect = () => {
        //dispatch(setUser('exist'))
        navigate('/')
    }

    const handleInputChange = (e: any) => {
        setName(e.target.value)
    }

    const handleIcon = () => {
        if (btnType === 'password') {
            setBtnType('text')
        } else {
            setBtnType('password')
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 300,
                paddingTop: 200,
            }}
        >
            <Typography size={'h1'} weight={'normal'} color={'primary'}>
                Login
            </Typography>

            <Input
                size={'small'}
                color={'success'}
                disabled={false}
                onChange={handleInputChange}
                value={name}
                placeholder={'Inserisci qui il tuo nome...'}
                type={btnType}
                iconCallback={handleIcon}
                suffix={'arrowForward'}
            />

            <Checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
                title={'Inserire testo'}
                color={'secondary'}
                disabled={false}
                type={'radio'}
                hasContainer={true}
                //subtitle={'Lorem ipsum dolor sit amet'}
            />

            <CaltonSelect
                size={'small'}
                color={'secondary'}
                customColor={'#7161EF'}
            />

            <Switch
                checked={checked}
                disabled={false}
                onClick={() => setChecked(!checked)}
                icon={true}
            />

            <SvgWrapper
                keySvg={'settingsSvg'}
                color={'primaryIcon'}
                size={'xlarge'}
                hasContainerProps={{
                    hasContainer: true,
                    containerSize: 50,
                }}
            />
        </div>
    )
}

export default Home
