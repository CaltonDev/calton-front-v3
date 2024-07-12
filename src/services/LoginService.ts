import apiService from './api/apiService'
import { getHeaders } from './api/headers'

interface RegisterBody {
    name: string
    surname: string
    email: string
    companyName: string
    lat: string
    lng: string
    address: string
    isChainOwner: boolean
    numCiv: string
    city: string
    phone: string
    isBranch: boolean
    province: string
    region: string
    type: string
    sector: string
    includeTopic: boolean
    country: string
    zip: string
    googlePlaceID: string
    formatted_address: string
    password: string
    numberLocations: string
    typeReg: string
    lang: string
    platformType: string
}

interface SubUserBody {
    email?: string
    typeAccount?: string
    parentID?: string
    assignedLocations?: string
    name?: string
    surname?: string
    lang?: string
}
export const login = async (email: string, password: string): Promise<any> => {
    const body = {
        email,
        password,
    }
    return await apiService.apiUrl.post('/user/login', body)
}

function register(body: RegisterBody) {
    return apiService.apiUrl.post('/user/register', body)
}

function recoverPwdEdit(
    tokenUrl: string,
    password: string,
    passwordConfirm: string
) {
    const body = {
        tokenUrl,
        password,
        passwordConfirm,
    }
    return apiService.apiUrl.post('/user/completeAclPwd', body)
}

function recoverPwd(email: string) {
    const body = {
        email,
    }
    return apiService.apiUrl.post('/user/recoverPwdMail', body)
}

function getChildUsers() {
    return apiService.apiUrl.post('/user/getChildUsers', {}, getHeaders())
}

function registerSubAccount(newUser: SubUserBody) {
    return apiService.apiUrl.post(
        '/user/registerSubAccount',
        newUser,
        getHeaders()
    )
}

function checkSub() {
    return apiService.apiUrl.post(
        '/subscription/checkSub',
        {},
        getHeaders(false, false)
    )
}

function editChildUser(newUser: SubUserBody) {
    return apiService.apiUrl.post('/user/editChildUser', newUser, getHeaders())
}

function deleteChildUser(newUser: SubUserBody) {
    return apiService.apiUrl.post('/user/deleteUser', newUser, getHeaders())
}

function editUser(newUser: SubUserBody) {
    return apiService.apiUrl.post('/user/editUser', newUser, getHeaders())
}

function getUser() {
    return apiService.apiUrl.post('/user/getUser', {}, getHeaders())
}

const LoginService = {
    login,
    register,
    recoverPwd,
    getChildUsers,
    registerSubAccount,
    editChildUser,
    deleteChildUser,
    editUser,
    getUser,
    checkSub,
    recoverPwdEdit,
}

export default LoginService
