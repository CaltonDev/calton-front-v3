import React from 'react'
import { FormikProps } from 'formik'

export type AddAccountFormData = {
    email: string
    accountType: string
    name: string
    surname: string
    language: string
    locationAssociated: string
}

export interface AddAccountFormProps {
    formData?: AddAccountFormData
    formRef: React.Ref<FormikProps<AddAccountFormData>>
    isOnEdit: boolean
}
