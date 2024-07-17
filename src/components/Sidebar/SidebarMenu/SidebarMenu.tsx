import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './SidebarMenu.module.scss'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
const SidebarMenu = () => {
    const temporary = {
        navLinks: {
            reviews: [
                {
                    menu_title: 'Home',
                    menu_icon: 'home.svg',
                    path: '/app/home',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 0,
                },
                {
                    menu_title: 'Reviews',
                    menu_icon: 'reviews.svg',
                    path: '/app/reviews',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 1,
                },
                {
                    menu_title: 'Locations',
                    menu_icon: 'location.svg',
                    path: '/app/locations',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    customSize: 31,
                    id: 2,
                },
                {
                    menu_title: 'Products',
                    menu_icon: 'products.svg',
                    path: '/app/products',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    customSize: 31,
                    id: 3,
                },
                {
                    menu_title: 'Fonti',
                    menu_icon: 'Fonti.svg',
                    path: '/app/fonti',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    customSize: 25,
                    id: 4,
                },
                {
                    menu_title: 'Grafo',
                    menu_icon: 'Grafo.svg',
                    path: '/app/grafo',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 5,
                },
                {
                    menu_title: 'Analisi Avanzata',
                    menu_icon: 'analisi_avanzata.svg',
                    path: '/app/analisiavanzata',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 6,
                },
            ],
            surveys: [
                {
                    menu_title: 'Home',
                    menu_icon: 'home.svg',
                    path: '/app/home',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 0,
                },
                {
                    menu_title: 'Risposte',
                    menu_icon: 'reviews.svg',
                    path: '/app/reviews',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 1,
                },
                {
                    menu_title: 'Surveys',
                    menu_icon: 'sondaggi.svg',
                    path: '/app/surveys',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 4,
                },
            ],
            competitor: [
                {
                    menu_title: 'Home',
                    menu_icon: 'home.svg',
                    path: '/app/home',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 0,
                },
                {
                    menu_title: 'Reviews',
                    menu_icon: 'reviews.svg',
                    path: '/app/reviews',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 1,
                },
                {
                    menu_title: 'Locations',
                    menu_icon: 'location.svg',
                    path: '/app/locations',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 2,
                },
                {
                    menu_title: 'Products',
                    menu_icon: 'products.svg',
                    path: '/app/products',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 3,
                },
                {
                    menu_title: 'Fonti',
                    menu_icon: 'Fonti.svg',
                    path: '/app/fonti',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 4,
                },
                {
                    menu_title: 'Analisi Avanzata',
                    menu_icon: 'analisi_avanzata.svg',
                    path: '/app/analisiavanzata',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 6,
                },
            ],
            listing: [
                {
                    menu_title: 'Home',
                    menu_icon: 'home.svg',
                    path: '/app/home',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 0,
                },
                {
                    menu_title: 'Menu',
                    menu_icon: 'menu.svg',
                    path: '/app/menu',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 1,
                },
                {
                    menu_title: 'Hours',
                    menu_icon: 'hours.svg',
                    path: '/app/hours',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 2,
                },
                {
                    menu_title: 'EditOthers',
                    menu_icon: 'editOthers.svg',
                    path: '/app/editOthers',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 4,
                },
                {
                    menu_title: 'Photo',
                    menu_icon: 'photo.svg',
                    path: '/app/photo',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 5,
                },
                {
                    menu_title: 'LocalPost',
                    menu_icon: 'localPost.svg',
                    path: '/app/localPost',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 6,
                },
                {
                    menu_title: 'Performance',
                    menu_icon: 'performance.svg',
                    path: '/app/performance',
                    new_item: true,
                    child_routes: null,
                    customIcon: true,
                    visible: true,
                    id: 7,
                },
            ],
        },
    }
    const routes = temporary?.navLinks //useSelector((state: any) => state?.user?.data?.navLinks)
    const platformType = 'reviews' //useSelector((state: any) => state?.settings?.platformType)
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
                                                        ? '#3f49fc'
                                                        : ''
                                                }
                                                size={'large'}
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
