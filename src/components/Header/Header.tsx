import React, { useCallback, useState } from 'react'
import styles from './Header.module.scss'
import CaltonLogoWh from '../../assets/img/Logo Calton Mascotte.png'
import Sidebar from '../Sidebar/Sidebar'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import SearchBar from '../SearchBar/SearchBar'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'

function Header() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const search = 'test' //useSelector((state) => state?.Search?.wordSearched)
    const [searchLocal, setSearchLocal] = useState(search)

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

    return (
        <header className={styles.appHeader}>
            <div className={styles.containerHeader}>
                <img src={CaltonLogoWh} alt="session-logo" width="55" />
                <Sidebar />
                <SearchBar
                    value={searchLocal}
                    placeholder={t('Cerca una parola o un feedback completo')}
                    onChange={(event) => {
                        handleSearch(event.target.value)
                    }}
                />
                <div>
                    <SvgWrapper />
                    <SvgWrapper />
                </div>
            </div>
        </header>
    )
}

export default Header
