import store from '../../store/store'

// getHeaders.ts
interface Headers {
    Authorization?: string
    sessionId?: string
}

interface GetHeadersResult {
    headers: Headers
}

export function getHeaders(
    shouldNotBeLogged: boolean,
    requireSession = false
): GetHeadersResult {
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

    return {
        headers: {
            Authorization: token,
            ...(requireSession && sessionId ? { sessionId } : {}),
        },
    }
}
