import styles from './AddAccountForm.module.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'formik-antd'
import Typography from '../../Typography/Typography'
import { Field, Formik } from 'formik'
import FormInputWrapper from '../../FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import { handleKeyDown } from '../../../utils/utils'
import { isEmail, isWhiteSpaceString } from '../../../helpers/helpers'
import FormSelectWrapper from '../../FormFieldsWrapper/FormSelectWrapper/FormSelectWrapper'
import { AddAccountFormProps } from './AddAccountForm.interface'

function AddAccountForm({
    formData,
    formRef,
    isOnEdit = false,
}: AddAccountFormProps) {
    const { t } = useTranslation()
    const handleSubmit = async (values: {
        email: string
        accountType: string
        name: string
        surname: string
        language: string
        locationAssociated: string
    }) => {
        //await SignUp(values.email, values.password)
    }

    function validateLoginFields(values: string, fieldType: string) {
        if (fieldType === 'email' && !isEmail(values)) {
            return t('Text should be an email')
        }

        if (isWhiteSpaceString(values)) {
            return t('Obbligatorio')
        }

        if (values?.length === 0) {
            return t('Obbligatorio')
        }

        return undefined
    }

    return (
        <div className={styles.container}>
            <Formik
                innerRef={formRef}
                initialValues={{
                    email: '',
                    accountType: '',
                    name: '',
                    surname: '',
                    language: '',
                    locationAssociated: '',
                }}
                onSubmit={async (values, actions) => {
                    await handleSubmit(values)
                    actions.setSubmitting(false)
                }}
            >
                {(formikProps) => {
                    return (
                        <Form onKeyDown={handleKeyDown} className={styles.form}>
                            <div className={styles.formRow}>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('E-mail') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        fullWidth={true}
                                        name="email"
                                        component={FormInputWrapper}
                                        placeholder={t('Email Name')}
                                        formikProps={formikProps}
                                        required={true}
                                        validate={(value: any) =>
                                            validateLoginFields(value, 'email')
                                        }
                                    />
                                </div>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('Tipo di account') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        customBorderColor={'#9D96A5'}
                                        fullWidth={true}
                                        name="accountType"
                                        component={FormSelectWrapper}
                                        placeholder={t('Your account type')}
                                        validate={(value: any) =>
                                            validateLoginFields(
                                                value,
                                                'accountType'
                                            )
                                        }
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('Name') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        fullWidth={true}
                                        name="name"
                                        component={FormInputWrapper}
                                        placeholder={t('Your name')}
                                        formikProps={formikProps}
                                        required={true}
                                        validate={(value: any) =>
                                            validateLoginFields(value, 'name')
                                        }
                                    />
                                </div>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('Last name') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        fullWidth={true}
                                        name="lastName"
                                        component={FormInputWrapper}
                                        placeholder={t('Your last name')}
                                        formikProps={formikProps}
                                        required={true}
                                        validate={(value: any) =>
                                            validateLoginFields(
                                                value,
                                                'lastName'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('Lingua operativa') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        customBorderColor={'#9D96A5'}
                                        fullWidth={true}
                                        name="language"
                                        component={FormSelectWrapper}
                                        placeholder={t(
                                            'Your operative language'
                                        )}
                                        validate={(value: any) =>
                                            validateLoginFields(
                                                value,
                                                'language'
                                            )
                                        }
                                        required={true}
                                    />
                                </div>
                                <div
                                    className={styles.inputDiv}
                                    style={{ width: '50%' }}
                                >
                                    <Typography
                                        size={'bodySmall'}
                                        weight={'light'}
                                    >
                                        {t('Location associate') + '*'}
                                    </Typography>
                                    <Field
                                        disabled={!isOnEdit}
                                        customBorderColor={'#9D96A5'}
                                        fullWidth={true}
                                        name="locations"
                                        component={FormSelectWrapper}
                                        placeholder={t(
                                            'Your associated location'
                                        )}
                                        validate={(value: any) =>
                                            validateLoginFields(
                                                value,
                                                'locations'
                                            )
                                        }
                                        required={true}
                                    />
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddAccountForm
