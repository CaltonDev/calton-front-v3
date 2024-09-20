import React, { useRef, useState } from 'react'
import { SettingsFieldsContainerProps } from './SettingsFieldsContainer.interface'
import styles from './SettingsFieldsContainer.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import AddAccountForm from '../Forms/AddAccountForm/AddAccountForm'
import { FormikProps } from 'formik'
import { AddAccountFormData } from '../Forms/AddAccountForm/AddAccountForm.interface'
import AddGroupsForm from '../Forms/AddGroupsForm/AddGroupsForm'
const SettingsFieldsContainer = ({
    data,
    type,
    isNew = false,
}: SettingsFieldsContainerProps) => {
    const { t } = useTranslation()
    const newDataTitle =
        type === 'account'
            ? t('Aggiungi account')
            : type === 'gruppi'
              ? t('Crea nuovo gruppo')
              : type === 'report'
                ? t('Crea nuovo report')
                : type === t('Aggiungi smart response')
    const [isOnEdit, setIsOnEdit] = useState(false)
    const formRef = useRef<FormikProps<any>>(null)

    const handleSaveBtn = () => {
        setIsOnEdit(false)
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    //add fetch function, form data should be null if is new or full if fetched
    const [formData, setFormData] = useState<any>()
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography size={'bodyBig'} weight={'bold'} color={'black'}>
                    {isNew ? newDataTitle : data?.title}
                </Typography>
                <div
                    className={
                        isNew ? styles.btnContainer : styles.iconsContainer
                    }
                >
                    {isOnEdit ? (
                        <>
                            <Button
                                variant={'outline'}
                                size={'small'}
                                onClick={() => setIsOnEdit(false)}
                            >
                                {t('Annulla')}
                            </Button>
                            <Button
                                variant={'solid'}
                                size={'small'}
                                onClick={handleSaveBtn}
                            >
                                {t('Salva')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <SvgWrapper
                                keySvg={'editIcon'}
                                color={'black'}
                                onClick={() => setIsOnEdit(true)}
                            />
                            <SvgWrapper keySvg={'trashIcon'} color={'black'} />
                        </>
                    )}
                </div>
            </div>
            <div className={styles.body}>
                {type === 'account' ? (
                    <AddAccountForm
                        formData={formData}
                        formRef={formRef}
                        isOnEdit={isOnEdit}
                    />
                ) : (
                    type === 'gruppi' && (
                        <AddGroupsForm
                            formData={formData}
                            formRef={formRef}
                            isNew={isNew}
                            isOnEdit={isOnEdit}
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default SettingsFieldsContainer
