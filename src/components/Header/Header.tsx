import React, { useCallback, useState } from 'react'
import styles from './Header.module.scss'
import Sidebar from '../Sidebar/Sidebar'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import SearchBar from '../SearchBar/SearchBar'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import { setPlatformType } from '../../store/settings/settingsSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'

function Header() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const search = 'test' //useSelector((state) => state?.Search?.wordSearched)
    const [searchLocal, setSearchLocal] = useState(search)
    const history = useNavigate()

    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )

    const handler = useCallback(
        debounce(
            (text) =>
                dispatch(
                    //setWordSearched(text)
                    text
                ),
            500
        ),
        []
    )
    const handlerLoc = useCallback(
        debounce(
            (text) =>
                dispatch(
                    //setSelLocSearched(text)
                    text
                ),
            500
        ),
        []
    )

    const handleSearch = async (text: string) => {
        setSearchLocal(text)
        if (window.location.pathname === '/reviews') {
            handler(text)
        } else if (
            window.location.pathname === '/chooseLocations' ||
            window.location.pathname === '/fonti' ||
            window.location.pathname === '/locations'
        ) {
            handlerLoc(text)
        }
    }

    const handleClickOnSettingsIcon = () => {
        dispatch(setPlatformType('settings'))
        history('./settings')
    }
    return (
        <header className={styles.appHeader}>
            <div className={styles.containerHeader}>
                <div className={styles.leftHeaderContainer}>
                    <SvgWrapper
                        keySvg={'caltonLogoSvg'}
                        color={'primaryIcon'}
                        customWidth={35}
                        customHeight={35}
                        hasContainerProps={{
                            hasContainer: true,
                            containerSize: 45,
                        }}
                    />
                    <Sidebar />
                </div>
                <div className={styles.rightHeaderContainer}>
                    <SearchBar
                        value={searchLocal}
                        placeholder={t(
                            'Cerca una parola o un feedback completo'
                        )}
                        onChange={(event) => {
                            handleSearch(event.target.value)
                        }}
                    />
                    <div className={styles.iconContainer}>
                        <SvgWrapper
                            keySvg={'settingsSvg'}
                            color={
                                platformType === 'settings'
                                    ? 'white'
                                    : 'primaryIcon'
                            }
                            size={'xlarge'}
                            hasContainerProps={
                                platformType === 'settings'
                                    ? {
                                          hasContainer: true,
                                          containerSize: 45,
                                          background: '#C0BBC5',
                                      }
                                    : {
                                          hasContainer: true,
                                          containerSize: 45,
                                      }
                            }
                            onClick={handleClickOnSettingsIcon}
                        />
                        <SvgWrapper
                            keySvg={'profileSvg'}
                            color={'primaryIcon'}
                            size={'xlarge'}
                            hasContainerProps={{
                                hasContainer: true,
                                containerSize: 45,
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
