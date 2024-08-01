import React, { lazy, Suspense, ReactNode, ComponentType } from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom'
import '../src/style/app.scss'
import Login from './pages/Login/Login'
import Layout from './layout/Layout'
import './i18n'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { objRoutes } from './services/routerServices'
const persistor = persistStore(store)

const LazyComponentWrapper = ({
    component: Component,
}: {
    component: React.LazyExoticComponent<ComponentType<any>>
}) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
)

const children: RouteObject[] = []
for (const [key, value] of Object.entries(objRoutes)) {
    children.push({
        path: value.path,
        element: <LazyComponentWrapper component={value.component} />,
    })
}

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        element: <Layout />,
        children: children,
    },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
