
export type AuthInputProps = {
    placeholder?: string
    value: string,
    type?: 'password' | 'text',
    name: 'username' | 'password' | 'otp',
    errors: string,
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    }
}
