---
description: test
---

# test page

test page

```typescript
// Some code
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ErrorSubscriptionModal from '../components/ErrorSubscriptionModal/ErrorSubscriptionModal'
import Header from '../components/Header/Header'
import FiltersSidebar from '../components/Sidebar/FiltersSidebar/FiltersSidebar'
import Chat from '../components/Chat/Chat'
import { useTranslation } from 'react-i18next'
import { resetUploadPhotos } from '../store/photos/photosSlice'
import { listingStateObj } from '../constants/CustomConstants'
import { FiltersState, setStateSelect } from '../store/filters/filtersSlice'
import { manageLayoutToastWSAndReload } from '../helpers/helpers'
import AppConfig from '../constants/AppConfig'
import LoginService from '../services/LoginService'
import { setUser } from '../store/user/userSlice'
import { setShowNumbers, setSidebar } from '../store/settings/settingsSlice'
import { toast } from 'react-toastify'
import Hotjar from '@hotjar/browser'
import { v5 as uuidv5 } from 'uuid'
import { EP_SERVER, IS_DEMO, IS_PROD } from '../constants/envrionment'
import store from '../store/store'
import { pushSocketMessage, SocketState } from '../store/socket/socketSlice'
import { ErrorToastState, showToast } from '../store/toast/errorToastSlice'
import FileDownload from 'js-file-download'

function Layout() {
    const user = useSelector((state: RootState) => state.User)
    const history = useNavigate()
    const [compId, setCompId] = useState(sessionStorage.getItem('unique'))
    const dispatch = useDispatch()
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )
    const { t } = useTranslation()
    const socketMessage = useSelector(
        (state: RootState) => state?.Socket?.message
    )
    const listingStateFilter = useSelector(
        (state: FiltersState) => state?.listingLocationState
    )

    const location = useLocation()
    const routes = useSelector((state: RootState) => state?.User?.routes)
    const platformType = useSelector(
        (state: RootState) => state.Settings.platformType
    )
    useEffect(() => {
        dispatch(resetUploadPhotos())
    }, [])

    useEffect(() => {
        if (!listingStateFilter) {
            const initPayload = {
                type: 'listingLocationState',
                value: listingStateObj,
            }
            dispatch(setStateSelect(initPayload))
        }
    }, [listingStateFilter])

    useEffect(() => {
        if (socketMessage) {
            manageLayoutToastWSAndReload(socketMessage, null, dispatch, t)
        }
    }, [socketMessage])

    useEffect(() => {
        // hotjar.initialize(AppConfig.hotjarProd, 6);
        Hotjar.init(AppConfig.hotjarProd, 6)
    })

    const checkSub = async () => {
        if (user) {
            try {
                const response = await LoginService.checkSub()
                if (!sessionStorage.getItem('unique')) {
                    const currId = uuidv5(
                        user?.user?.token + new Date().toString(),
                        AppConfig.namespace
                    )
                    // console.log('curr: ', currId);
                    setCompId(currId)
                    sessionStorage.setItem('unique', currId)
                }
            } catch (e) {
                console.log(e)
                setTimeout(() => {
                    dispatch(setUser(null))
                }, 5000)
            }
        }
    }

    useEffect(() => {
        checkSub()
    }, [user])

    useEffect(() => {
        if (showNumbers === undefined) {
            dispatch(setShowNumbers(false))
        }
        dispatch(setSidebar(false))
    }, [])

    useEffect(() => {
        if (routes) {
            /* TODO POSSIBLE NEW LOGIC BUT ALIGN BACK FIRST
             *
             *  const locationArray = location.pathname.split("/")
             *  const actualLocation = locationArray[1];
             *  const found = routes[platformType]?.some(
             *    (el) => {
             *      return (el.path === actualLocation && el.path.split("/")?.length === locationArray?.length - 1) || actualLocation === 'buyNow'
             *    }
             *   );
             */
            const actualLocation = location.pathname.split('/')[1]
            const found = routes[platformType]?.some(
                (el: any) =>
                    el.path === actualLocation ||
                    el.path.split('/')[0] === actualLocation ||
                    actualLocation === 'buyNow'
            )

            const foundHome = routes[platformType]?.some(
                (el: any) =>
                    el.path === 'home' || el.path.split('/')[0] === 'home'
            )

            if (!found && !foundHome) {
                history('../buyNow')
            } else if (!found && foundHome) {
                history('../home')
            } else if (found && actualLocation === 'buyNow') {
                if (foundHome) {
                    history('../home')
                }
            }
        }
    }, [platformType, location.pathname, routes])

    if (!user?.user && location.pathname !== '/signup') {
        return <Navigate to={'/login'} />
    } else if (location.pathname === '/') {
        return <Navigate to={'/home'} />
    }

    //todo: find errors
    /*useEffect(() => {
        try {
            if (compId) {
                const ws = new WebSocket(
                    `wss://${EP_SERVER}/handleUpdatesData/client/${store.getState()?.user?.data?.user?.token}/${compId}`
                )
                // const ws = new WebSocket(`ws://localhost:5001/handleUpdatesData/client/${store.getState()?.user?.data?.user?.token}/${compId}`);

                ws.onopen = (event) => {
                    // console.log(event);
                    // ws.send(JSON.stringify(apiCall));
                }

                ws.onerror = function (error) {
                    console.log('WEBSOCKET error:', error)
                }

                ws.onmessage = async function (event) {
                    // console.log(event);
                    try {
                        const currData = JSON.parse(event.data)
                        // console.log(currData);
                        if (currData?.type === 'excel') {
                            // saveAs(new Blob([currData.content]), currData?.name ? currData?.name : 'download.xlsx');
                            const binary_string = window.atob(currData.content)
                            const len = binary_string.length
                            const bytes = new Uint8Array(len)
                            for (let i = 0; i < len; i++) {
                                bytes[i] = binary_string.charCodeAt(i)
                            }

                            const file = new Blob([bytes.buffer], {
                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            })

                            return FileDownload(
                                file,
                                currData?.name
                                    ? currData?.name
                                    : 'download.xlsx'
                            )
                        } else if (currData?.type === 'sub') {
                            const newUser = JSON.parse(JSON.stringify(user))
                            newUser.routes = currData?.routes ?? newUser?.routes
                            newUser.navLinks =
                                currData?.navLinks ?? newUser?.navLinks
                            newUser.enableGenerateResponse =
                                currData?.enableGenerateResponse
                            newUser.trustpilotReply = currData?.trustpilotReply
                            dispatch(setUser(newUser))
                        } else if (currData?.type === 'logout') {
                            history('/login')
                        } else if (currData?.type === 'uploadSource') {
                            const idToast = currData?.idSource
                            const statusCode = currData?.status
                            const pendingText = currData?.message
                            setTimeout(() => {
                                if (idToast) {
                                    if (statusCode === 200) {
                                        dispatch(
                                            showToast({
                                                type: 5,
                                                idTask: idToast,
                                                pendingText: pendingText,
                                            })
                                        ) // todo: translation needed
                                    } else {
                                        dispatch(
                                            showToast({
                                                type: 6,
                                                idTask: idToast,
                                                pendingText: pendingText,
                                            })
                                        ) // todo: translation needed
                                    }
                                }
                            }, 100)
                        } else if (currData?.type === 'updateBulk') {
                            dispatch(pushSocketMessage(currData))
                        }
                    } catch (err) {
                        if (!IS_PROD) {
                            console.log(err)
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }, [compId])*/

    const currentToast = useSelector(
        (state: ErrorToastState) => state.currentToast
    )
    useEffect(() => {
        currentToast?.map((id, text) => toast.loading(text, { toastId: id }))
    }, [currentToast])

    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <div style={{ background: '#F5F5F5' }}>
            <ErrorSubscriptionModal />
            <Header />
            <FiltersSidebar />
            <Chat />
            <Outlet />
        </div>
    )
}

export default Layout

```

test page 2