import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '../src/style/app.scss'
import Login from './pages/Login/Login'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
    },
])

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
