import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

function Layout() {
    const user = useSelector((state: RootState) => state.user?.data)
    if (!user) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <div>
            Layout
            <Outlet />
        </div>
    )
}

export default Layout
