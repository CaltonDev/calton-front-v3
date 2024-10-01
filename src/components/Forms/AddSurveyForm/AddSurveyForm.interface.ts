import React from 'react'
import { FormikProps } from 'formik'

export type AddGroupsFormData = {
    name: string
    accounts: string[]
}

export interface AddGroupsFormProps {
    formData?: AddGroupsFormData
    formRef: React.Ref<FormikProps<AddGroupsFormData>>
    isNew: boolean
    isOnEdit: boolean
}
