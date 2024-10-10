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
import CustomGooglePlacesAutocomplete from '../CustomGoogleAutocomplete/CustomGooglePlacesAutocomplete'
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
    const [locationInput, setLocationInput] = useState('')
    const [objPlace, setObjPlace] = useState(null)

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
                <div className={styles.textHeader}>
                    <Typography size={'h5'} weight={'bold'} color={'black'}>
                        {t('Analisi competitor')}
                    </Typography>
                    <Typography size={'h5'} weight={'light'} color={'black'}>
                        {' - ' + data?.title}
                    </Typography>
                </div>
                <div className={styles.btnContainer}>
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
                </div>
            </div>
            <div className={styles.description}>
                <Typography
                    size={'bodySmall'}
                    weight={'normal'}
                    color={'black'}
                >
                    {t(
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
                    )}
                </Typography>
            </div>
            <div className={styles.body}>
                <CustomGooglePlacesAutocomplete
                    placeHolder={t('Cerca un punto vendita da aggiungere')}
                    customClass={styles.containerGoogle}
                    locationInput={locationInput}
                    setLocationValue={setObjPlace}
                />
            </div>
        </div>
    )
}

export default AddAnalisiCompetitorContainer
