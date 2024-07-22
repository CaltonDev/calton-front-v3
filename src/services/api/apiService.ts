// endPoints.ts
import { Config, getConfig } from './config'

const config: Config = getConfig()

interface FetchOptions extends RequestInit {
    body?: any
}

const fetchData = async (
    url: string,
    options: FetchOptions = {}
): Promise<any> => {
    const defaultOptions: FetchOptions = {
        //ask chat gpt
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 100000000)

    try {
        const response = await fetch(url, {
            ...defaultOptions,
            signal: controller.signal,
        })
        clearTimeout(timeout)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Fetch error:', error)
        throw error
    }
}

type EndPoints = {
    [key: string]: {
        get: (url: string, options?: FetchOptions) => Promise<any>
        post: (url: string, body: any, options?: FetchOptions) => Promise<any>
        put: (url: string, body: any, options?: FetchOptions) => Promise<any>
        delete: (url: string, options?: FetchOptions) => Promise<any>
    }
}

const endPoints: EndPoints = {}

Object.keys(config).forEach((key) => {
    const baseUrl = config[key]

    endPoints[key] = {
        get: (url: string, options?: FetchOptions) =>
            fetchData(`${baseUrl}${url}`, { ...options, method: 'GET' }),
        post: (url: string, body: any, options?: FetchOptions) =>
            fetchData(`${baseUrl}${url}`, {
                ...options,
                method: 'POST',
                body: JSON.stringify(body),
            }),
        put: (url: string, body: any, options?: FetchOptions) =>
            fetchData(`${baseUrl}${url}`, {
                ...options,
                method: 'PUT',
                body: JSON.stringify(body),
            }),
        delete: (url: string, options?: FetchOptions) =>
            fetchData(`${baseUrl}${url}`, { ...options, method: 'DELETE' }),
    }
})

export default endPoints
