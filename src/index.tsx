import React, { Suspense, ComponentType } from 'react'
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
import { QueryClientProvider, QueryClient } from 'react-query'
import SignUp from './pages/SignUp/SignUp'
import CompleteSignUp from './pages/CompleteSignUp/CompleteSignUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'rc-time-picker/assets/index.css'

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
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/complete-sign-up',
        element: <CompleteSignUp />,
    },
    {
        element: <Layout />,
        children: children,
    },
])

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ToastContainer autoClose={2000} position="top-right" />
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
)
