import styles from './FormSelectWrapper.module.scss'
import React, { useEffect } from 'react'
import Input from '../../Input/Input'
import Typography from '../../Typography/Typography'
import CaltonSelect from '../../Select/Select'
function FormSelectWrapper({
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
            <CaltonSelect
                {...field}
                {...props}
                customColor={'white'}
                placeholderColor={'#9D96A5'}
                size={'fullWidth'}
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
export default FormSelectWrapper
