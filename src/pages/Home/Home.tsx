import styles from './Home.module.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/user/userSlice'
import Typography from '../../components/Typography/Typography'
import Input from '../../components/Input/Input'
import Checkbox from '../../components/Checkbox/Checkbox'
import Switch from '../../components/Switch/Switch'
import CaltonSelect from '../../components/Select/Select'
import SvgWrapper from '../../components/SvgWrapper/SvgWrapper'
import ServiceWrapper from '../../helpers/ServiceWrapper'
import { selectAllFilters } from '../../store/selectors/selectorsSlice'
import { SelectedWordsState } from '../../store/home/selectedWordsSlice'
import { useTranslation } from 'react-i18next'
import { SettingsState } from '../../store/settings/settingsSlice'
import Hooks from '../../utils/hooks/Hooks'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [btnType, setBtnType] = useState<'text' | 'password'>('password')
    const [checked, setChecked] = useState(false)
    const allFilters = useSelector(selectAllFilters)
    const wordSelected = useSelector(
        (state: SelectedWordsState) => state.SelectedWords
    )
    const platformType = useSelector(
        (state: SettingsState) => state.Settings.platformType
    )

    const { t } = useTranslation()

    const reloadHome = async () => {
        await ServiceWrapper.wrapperReloadHome(
            allFilters,
            'Date',
            wordSelected,
            dispatch,
            20,
            undefined,
            t
        )
    }

    useEffect(() => {
        ServiceWrapper.wrapperLoadFilters(allFilters, dispatch, platformType, t)
    }, [])

    Hooks.useDeepCompareEffect(() => {
        reloadHome()
    }, [allFilters])

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
        <div>
            {/*<Input
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
            />*/}
        </div>
    )
}

export default Home
