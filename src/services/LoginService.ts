import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface LoginResponse {
    token: string
    user: {
        id: string
        email: string
    }
}

export const login = async (email: string, password: string): Promise<any> => {
    const body = {
        email,
        password,
    }
    return await apiService.apiUrl.post('/user/login', body)
}

/*
function register(body) {
    return apiService.apiUrl.post('user/register', body)
}

function recoverPwdEdit(tokenUrl, password, passwordConfirm) {
    const body = {
        tokenUrl,
        password,
        passwordConfirm,
    }
    return apiService.apiUrl.post('user/completeAclPwd', body)
}

function recoverPwd(email) {
    const body = {
        email,
    }
    return apiService.apiUrl.post('user/recoverPwdMail', body)
}

function getChildUsers() {
    return apiService.apiUrl.post('user/getChildUsers', {}, getHeaders())
}

function registerSubAccount(newUser) {
    return apiService.apiUrl.post(
        'user/registerSubAccount',
        newUser,
        getHeaders()
    )
}

function checkSub() {
    return apiService.apiUrl.post('subscription/checkSub', {}, getHeaders())
}

function editChildUser(newUser) {
    return apiService.apiUrl.post('user/editChildUser', newUser, getHeaders())
}

function deleteChildUser(newUser) {
    return apiService.apiUrl.post('user/deleteUser', newUser, getHeaders())
}

function editUser(newUser) {
    return apiService.apiUrl.post('user/editUser', newUser, getHeaders())
}

function getUser() {
    return apiService.apiUrl.post('user/getUser', {}, getHeaders())
}
*/
const LoginService = {
    login,
    /*
    register,
    recoverPwd,
    getChildUsers,
    registerSubAccount,
    editChildUser,
    deleteChildUser,
    editUser,
    getUser,
    checkSub,
    recoverPwdEdit,*/
}

export default LoginService
