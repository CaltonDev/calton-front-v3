import store from '../../store/store'

interface HeadersInit {
    [key: string]: string
}

export interface FetchOptions extends RequestInit {
    headers: HeadersInit
}

export function getHeaders(
    shouldNotBeLogged?: boolean,
    requireSession = false
): FetchOptions {
    if (shouldNotBeLogged) {
        return {
            headers: {},
        }
    }

    const state = store.getState()
    const token = state?.user?.data?.user?.token || ''
    const sessionId = requireSession
        ? sessionStorage.getItem('unique') || ''
        : undefined

    const headers: HeadersInit = {
        Authorization: token,
    }

    if (requireSession && sessionId) {
        headers.sessionId = sessionId
    }

    return {
        headers,
    }
}
