import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './SidebarMenu.module.scss'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import { getBackgroundColor } from '../../../utils/utils'
import { RootState } from '../../../store/store'

const SidebarMenu = () => {
    const routes = useSelector((state: RootState) => state?.User?.navLinks)

    const platformType = useSelector(
        (state: RootState) => state?.Settings?.platformType
    )
    const history = useNavigate()

    const isActiveRoute = (path: string) => {
        return location.pathname === path
    }

    return (
        <div className={styles.iconContainer}>
            {routes &&
                routes[platformType] &&
                routes[platformType].map((route: any, key: any) => {
                    if (route?.menu_title !== 'EditOthers') {
                        const path = route.path.replace('/app', '')
                        return (
                            <div key={key}>
                                <span
                                    onClick={() => history(path)}
                                    className={styles.menuLi}
                                    key={key}
                                >
                                    <div
                                        className={
                                            isActiveRoute(path)
                                                ? styles.menuTitle +
                                                  ' ' +
                                                  styles.menuTitleActive
                                                : styles.menuTitle
                                        }
                                    >
                                        <span className={styles.spacer}>
                                            <SvgWrapper
                                                customColor={
                                                    isActiveRoute(path)
                                                        ? getBackgroundColor(
                                                              platformType
                                                          )
                                                        : 'white'
                                                }
                                                svgBackgroundColor={
                                                    isActiveRoute(path)
                                                        ? 'white'
                                                        : null
                                                }
                                                size={'xlarge'}
                                                customWidth={route?.customSize}
                                                customHeight={route?.customSize}
                                                keySvg={route?.menu_icon}
                                            />
                                        </span>
                                        <span
                                            className={styles.titleToShow}
                                        ></span>
                                    </div>
                                </span>
                            </div>
                        )
                    }
                })}
        </div>
    )
}

export default SidebarMenu
