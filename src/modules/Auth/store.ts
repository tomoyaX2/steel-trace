import { State } from "../../store";
import { LoginFormData } from "./types";
import { loop, Cmd } from 'redux-loop'
import axios from 'axios'
import { BackendRoutes } from "../../enums/backendRoutes";
import LocalStorage from "../../utils/LocalStorage";
import { Routes } from "../../enums/routes";
export const authState = {
    user: {},
    isAuth: false,
    otp: '',
    token: '',
    welcomeMessage: ''
}

export const selectUser = (state: State) => state.authReducer.user;
export const selectIsAuth = (state: State) => state.authReducer.isAuth
export const selectOtp = (state: State) => state.authReducer.otp
export const selectToken = (state: State) => state.authReducer.token
export const selectWelcomeMessage = (state: State) => state.authReducer.welcomeMessage
const remoteUrl = 'http://localhost:3001'

const INIT_LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIC_SUCCESS'
const INIT_VERIFY_OTP = 'INIT_VERIFY_OTP';
const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS'
const CHECK_AUTH = 'CHECK_AUTH';
const GET_PRIVATE = 'GET_PRIVATE';
const GET_PRIVATE_SUCCESS = 'GET_PRIVATE_SUCCESS';

const getPrivateSuccess = (welcomeMessage: string) => ({
    type: GET_PRIVATE_SUCCESS,
    welcomeMessage
})

export const getPrivate = (history) => ({
    type: GET_PRIVATE,
    history
})


export const initVerify = (otp: string, setFieldError, history) => ({
    type: INIT_VERIFY_OTP,
    setFieldError,
    otp,
    history
})

const initVerifySuccess = (token: string) => ({
    type: VERIFY_OTP_SUCCESS,
    token
})

export const initLogin = (formData: LoginFormData, setFieldError, history) => ({
    type: INIT_LOGIN,
    formData,
    setFieldError,
    history
})

const loginSuccess = (otp: string) => ({
    type: LOGIN_SUCCESS,
    otp
})

export const checkAuth = () => ({
    type: CHECK_AUTH
})

const proceedLogin = async (formData, setFieldError, history) => {
    try {
        const res = await axios.post(`${remoteUrl}${BackendRoutes.auth}`, formData)
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        const secret = await axios.get(`${remoteUrl}${BackendRoutes.generateSecret}`)
        const otp = await axios.post(`${remoteUrl}${BackendRoutes.generateOtp}`, { secret: secret.data.secret })
        history.push(Routes.verify)
        return otp.data.otp.token
    } catch (e) {
        setFieldError('username', 'invalid username or password')
        setFieldError('password', 'invalid username or password')
    }
}

const proceedVerifyOtp = async (otp, setFieldError, history) => {
    try {
        const res = await axios.post(`${remoteUrl}${BackendRoutes.verifyOtp}`, { otp })
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        LocalStorage.setItem('token', res.data.token)
        history.push(Routes.home)
        return res.data.token
    } catch (e) {
        setFieldError('username', 'invalid username or password')
    }
}

const redirectToPrivate = async (history) => {
    const res = await axios.get(`${remoteUrl}${BackendRoutes.protected}`)
    history.push(Routes.home)
    console.log('response', res.data.message)
    return res.data.message
}

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case INIT_LOGIN: {
            return loop({ ...state },
                Cmd.run(proceedLogin, {
                    successActionCreator: (otp) => loginSuccess(otp),
                    args: [action.formData, action.setFieldError, action.history]
                }))
        }
        case LOGIN_SUCCESS: {
            return { ...state, otp: action.otp }
        }
        case INIT_VERIFY_OTP: {
            return loop({ ...state },
                Cmd.run(proceedVerifyOtp, {
                    successActionCreator: (token) => initVerifySuccess(token),
                    args: [action.otp, action.setFieldError, action.history]
                }))
        }
        case VERIFY_OTP_SUCCESS: {
            return { ...state, token: action.token }
        }
        case GET_PRIVATE: {
            return loop({ ...state },
                Cmd.run(redirectToPrivate, {
                    successActionCreator: (welcomeMessage) => getPrivateSuccess(welcomeMessage),
                    args: [action.history]
                }))
        }
        case GET_PRIVATE_SUCCESS: {
            console.log('reducer', action.welcomeMessage)
            return { ...state, welcomeMessage: action.welcomeMessage }
        }
        default: {
            return { ...state }
        }
    }
}


export default authReducer