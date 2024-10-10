import React, { useRef, useState } from 'react'
import { AddAnalisiCompetitorContainerProps } from './AddAnalisiCompetitorContainer.interface'
import styles from './AddAnalisiCompetitorContainer.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
import AddAccountForm from '../Forms/AddAccountForm/AddAccountForm'
import { FormikProps } from 'formik'
import { AddAccountFormData } from '../Forms/AddAccountForm/AddAccountForm.interface'
import AddGroupsForm from '../Forms/AddGroupsForm/AddGroupsForm'
import AddSurveyForm from '../Forms/AddSurveyForm/AddSurveyForm'
const AddAnalisiCompetitorContainer = ({
    data,
    type,
    isNew = false,
}: AddAnalisiCompetitorContainerProps) => {
    const { t } = useTranslation()
    const newDataTitle =
        type === 'account'
            ? t('Aggiungi account')
            : type === 'gruppi'
              ? t('Crea nuovo gruppo')
              : type === 'report'
                ? t('Crea nuovo report')
                : type === 'surveys'
                  ? t('Crea nuovo sondaggio')
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
                    {type === 'surveys'
                        ? t('Anteprima')
                        : isNew
                          ? newDataTitle
                          : data?.title}
                </Typography>
                <div
                    className={
                        isNew ? styles.btnContainer : styles.iconsContainer
                    }
                >
                    {type === 'surveys' ? (
                        <>
                            <SvgWrapper keySvg={'shareIcon'} color={'black'} />
                            <SvgWrapper keySvg={'copyIcon'} color={'black'} />
                            <SvgWrapper
                                keySvg={'editIcon'}
                                color={'black'}
                                onClick={() => setIsOnEdit(true)}
                            />
                            <SvgWrapper keySvg={'trashIcon'} color={'black'} />
                        </>
                    ) : isOnEdit ? (
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

            {type === 'account' ? (
                <AddAccountForm
                    formData={formData}
                    formRef={formRef}
                    isOnEdit={isOnEdit}
                />
            ) : type === 'gruppi' ? (
                <AddGroupsForm
                    formData={formData}
                    formRef={formRef}
                    isNew={isNew}
                    isOnEdit={isOnEdit}
                />
            ) : (
                type === 'surveys' && (
                    <AddSurveyForm
                        formData={formData}
                        formRef={formRef}
                        isNew={isNew}
                        isOnEdit={isOnEdit}
                    />
                )
            )}
        </div>
    )
}

export default AddAnalisiCompetitorContainer
