import * as React from 'react';
import AuthInput from '../components/AuthInput/AuthInput';
import { VerifyCodeFormData } from '../types';
import { FormProps } from '../props';

const codePlaceholder = 'Code';

const VerifyCode: React.FC<FormProps<VerifyCodeFormData>> = ({
    values,
    errors,
    handleChange,
    handleSubmit }) => <div>
        <div className='flex flex-col items-center justify-center'>
            <span className='text-black text-2xl font-semibold'>
                Verify Code
        </span>
            <div className='flex flex-col items-center'>
                <form onSubmit={handleSubmit}>
                    <AuthInput type='text' name='otp' errors={errors.otp} handleChange={handleChange} placeholder={codePlaceholder} value={values.otp} />
                    <button className='px-12 h-12 border-4 border-gray-300 text-center mt-4' type='submit'>Verify</button>
                </form>
            </div>
        </div>
    </div>

export default VerifyCode