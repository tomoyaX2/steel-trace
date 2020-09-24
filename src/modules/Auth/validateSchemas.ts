import * as Yup from 'yup';


export const signUpSchema = Yup.object().shape({
    username: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

export const verifySchema = Yup.object().shape({
    otp: Yup.string()
        .required('Required'),
});