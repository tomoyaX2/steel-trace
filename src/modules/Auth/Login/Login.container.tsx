import * as React from 'react';
import { Formik } from 'formik';
import { signUpSchema } from '../validateSchemas';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { initLogin } from '../store';
import { useHistory } from 'react-router-dom'

const loginInitialValues = {
    username: '',
    password: ''
}

const LoginContainer: React.FC = () => {

    console.log('12313')
    const dispatch = useDispatch();
    const history = useHistory()
    const onSubmit = (values, { resetForm, setFieldError }) => {
        dispatch(initLogin(values, setFieldError, history))
        resetForm()
    }

    return <Formik
        initialValues={loginInitialValues}
        validationSchema={signUpSchema}
        onSubmit={onSubmit}
    >
        {({
            values,
            errors,
            handleChange,
            handleSubmit
        }) => <Login values={values} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} />}
    </Formik>
}


export default LoginContainer