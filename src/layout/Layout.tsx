import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import ErrorSubscriptionModal from '../components/ErrorSubscriptionModal/ErrorSubscriptionModal'
import Header from '../components/Header/Header'
import FiltersSidebar from '../components/Sidebar/FiltersSidebar/FiltersSidebar'
import Chat from '../components/Chat/Chat'

function Layout() {
    const user = useSelector((state: RootState) => state.user?.data)
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
