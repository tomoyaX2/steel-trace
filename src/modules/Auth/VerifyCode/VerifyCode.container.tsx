import * as React from 'react';
import { Formik } from 'formik';
import { verifySchema } from '../validateSchemas';
import VerifyCode from './VerifyCode';
import { useDispatch } from 'react-redux';
import { initVerify } from '../store';
import { useHistory } from 'react-router-dom';

const loginInitialValues = {
    otp: '',
}

const VerifyCodeContainer: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (values, { resetForm, setFieldError }) => {
        resetForm()
        dispatch(initVerify(values.otp, setFieldError, history))
    }



    return <Formik
        initialValues={loginInitialValues}
        validationSchema={verifySchema}
        onSubmit={onSubmit}
    >
        {({
            values,
            errors,
            handleChange,
            handleSubmit
        }) => <VerifyCode values={values} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} />}
    </Formik>
}


export default VerifyCodeContainer