import React from 'react'
import styles from './AddLocationModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { AddLocationModalProps } from './AddLocationModal.interface'
function AddLocationModal({ isOpen, setIsOpen }: AddLocationModalProps) {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(!isOpen)} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography size={'bodyBig'} weight={'bold'}>
                        {t('Aggiungi Luogo')}
                    </Typography>
                </div>
                <div className={styles.body}>
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t('Luogo')}
                    </Typography>
                    <Input fullWidth={true} />
                </div>
                <div className={styles.footer}>
                    <Button size={'medium'} variant={'outline'}>
                        {t('Annulla')}
                    </Button>
                    <Button size={'medium'}>{t('Aggiungi')}</Button>
                </div>
            </div>
        </>
    )
}

export default AddLocationModal
