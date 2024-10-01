import styles from './AddSurveyForm.module.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'formik-antd'
import Typography from '../../Typography/Typography'
import { Field, Formik } from 'formik'
import FormInputWrapper from '../../FormFieldsWrapper/FormInputWrapper/FormInputWrapper'
import { isEmail, isWhiteSpaceString } from '../../../helpers/helpers'
import { AddGroupsFormProps } from './AddSurveyForm.interface'
import Input from '../../Input/Input'
import TextContainer from '../../TextContainer/TextContainer'

function AddSurveyForm({
    formData,
    formRef,
    isNew = false,
    isOnEdit = false,
}: AddGroupsFormProps) {
    return <div className={styles.container}></div>
}

export default AddSurveyForm
