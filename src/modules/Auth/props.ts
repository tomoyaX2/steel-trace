import { FormikErrors } from "formik";


export type FormProps<FormData> = {
    values: FormData,
    errors: FormikErrors<FormData>,
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    },
    handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
}