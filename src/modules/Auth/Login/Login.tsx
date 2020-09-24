import * as React from 'react';
import AuthInput from '../components/AuthInput/AuthInput';
import { LoginFormData } from '../types';
import { FormProps } from '../props';
import '../styles.css'

const usernamePlaceholder = 'username';
const passwordPlaceholder = 'Password'

const Login: React.FC<FormProps<LoginFormData>> = ({
    values,
    errors,
    handleChange,
    handleSubmit
}) => <div>
        <div className='flex flex-col items-center justify-center'>
            <span className='text-black text-2xl font-semibold'>
                Login
        </span>
            <div className='flex flex-col items-center'>
                <form onSubmit={handleSubmit}>
                    <AuthInput type='text' name='username' errors={errors.username} handleChange={handleChange} placeholder={usernamePlaceholder} value={values.username} />
                    <AuthInput type='password' name='password' errors={errors.password} handleChange={handleChange} placeholder={passwordPlaceholder} value={values.password} />
                    <button className='px-12 h-12 border-4 border-gray-300 text-center mt-4' type='submit'>Log In</button>
                </form>
            </div>
        </div>
    </div>


export default Login