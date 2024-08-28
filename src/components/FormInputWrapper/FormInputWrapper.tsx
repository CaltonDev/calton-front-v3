import styles from './FormInputWrapper.module.scss'
import React, { useEffect } from 'react'
import Input from '../../components/Input/Input'
import Typography from '../../components/Typography/Typography'
function FormInputWrapper({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors, formikProps }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}: {
    field: any
    form: any
}) {
    useEffect(() => {
        formikProps?.setFieldValue(field.name, field.value)
        formikProps?.setFieldTouched(field.name, true)
    }, [field.value])

    return (
        <div className={styles.div}>
            <Input
                {...field}
                {...props}
                type={field.name === 'password' && 'password'}
            />
            {touched[field.name] && errors[field.name] && (
                <Typography
                    size={'bodySmall'}
                    weight={'normal'}
                    customTextColor={'#FF3739'}
                >
                    {errors[field.name]}
                </Typography>
            )}
        </div>
    )
}
export default FormInputWrapper
