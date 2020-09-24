export type LoginFormData = {
    username: string
    password: string
}

export type VerifyCodeFormData = {
    otp: string
}

export type AuthState = {
    user: any,
    isAuth: boolean
}