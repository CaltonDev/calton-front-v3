import styles from './AddGroupsForm.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'formik-antd'
import Typography from '../../Typography/Typography'
import { Field, Formik } from 'formik'
import FormInputWrapper from '../../FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import { handleKeyDown } from '../../../utils/utils'
import { isEmail, isWhiteSpaceString } from '../../../helpers/helpers'
import { AddGroupsFormProps } from './AddGroupsForm.interface'
import Input from '../../Input/Input'
import TextContainer from '../../TextContainer/TextContainer'

function AddGroupsForm({
    formData,
    formRef,
    isNew = false,
    isOnEdit = false,
}: AddGroupsFormProps) {
    const { t } = useTranslation()
    const [accounts, setAccounts] = useState<string[]>([
        'report number',
        'report number',
        'report number',
    ])
    const [inputValue, setInputValue] = useState<string>()

    const handleSubmit = async (values: {
        name: string
        accounts: string[]
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

    const handleAddAccount = (value: string) => {
        const tmpAccounts = JSON.parse(JSON.stringify(accounts))
        tmpAccounts.push(value)
        setAccounts(tmpAccounts)
    }

    const handleRemoveAccount = (idx: number) => {
        const tmpAccounts = JSON.parse(JSON.stringify(accounts))
        tmpAccounts.splice(idx, 1)
        setAccounts(tmpAccounts)
    }
    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            //todo add callback
        }
        console.log('E: ', e)
    }

    return (
        <div className={styles.container}>
            <Formik
                innerRef={formRef}
                initialValues={{
                    name: '',
                    accounts: [],
                }}
                onSubmit={async (values, actions) => {
                    await handleSubmit(values)
                    actions.setSubmitting(false)
                }}
            >
                {(formikProps) => {
                    return (
                        <Form className={styles.form}>
                            {isNew && (
                                <div className={styles.formRow}>
                                    <div
                                        className={styles.inputDiv}
                                        style={{ width: '50%' }}
                                    >
                                        <Typography
                                            size={'bodySmall'}
                                            weight={'light'}
                                        >
                                            {t('Nome del gruppo') + '*'}
                                        </Typography>
                                        <Field
                                            disabled={!isOnEdit}
                                            fullWidth={true}
                                            name="name"
                                            component={FormInputWrapper}
                                            placeholder={t('name')}
                                            formikProps={formikProps}
                                            required={true}
                                            validate={(value: any) =>
                                                validateLoginFields(
                                                    value,
                                                    'name'
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                            <div className={styles.formRow}>
                                <div className={styles.inputDiv}>
                                    <div className={styles.labelContainer}>
                                        <Typography
                                            size={'bodyMedium'}
                                            weight={'bold'}
                                        >
                                            {t(
                                                'Contatti associati a questo gruppo'
                                            )}
                                        </Typography>
                                        {isOnEdit && (
                                            <Typography
                                                size={'bodySmall'}
                                                weight={'light'}
                                            >
                                                {t(
                                                    'Inserisci le mail a cui verranno inviati questi report, dopo aver inserito la mail premi invio per aggiungerla.'
                                                )}
                                            </Typography>
                                        )}
                                    </div>
                                    {isOnEdit && (
                                        <Input
                                            disabled={!isOnEdit}
                                            fullWidth={true}
                                            name="contacts"
                                            placeholder={t('Your contact')}
                                            value={inputValue}
                                            onChange={(e) =>
                                                setInputValue(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                        />
                                    )}
                                    <div className={styles.chipsContainer}>
                                        {accounts.map((account, idx) => {
                                            return (
                                                <TextContainer
                                                    key={idx}
                                                    label={account}
                                                    customTextColor={'black'}
                                                    color={'#F1F1F1'}
                                                    iconSvg={'close.svg'}
                                                    iconColor={'black'}
                                                    customIconHeight={24}
                                                    customIconWidth={24}
                                                    rightSideIcon={true}
                                                    textSize={'bodySmall'}
                                                    iconCallback={() =>
                                                        handleRemoveAccount(idx)
                                                    }
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default AddGroupsForm
