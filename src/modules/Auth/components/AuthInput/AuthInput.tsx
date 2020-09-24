import * as React from 'react';
import { AuthInputProps } from './types';



const AuthInput: React.FC<AuthInputProps> = ({ placeholder, type = 'text', value, handleChange, errors, name }) => {
    return (
        <div className='my-4 flex-col flex'>
            <input onChange={handleChange}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                className='border-2 border-gray-300 px-4 py-2 text-black background-white w-80' />
            {errors &&
                <span className='text-base text-red-400 mt-2'>{errors}</span>
            }
        </div>
    )
}


export default AuthInput