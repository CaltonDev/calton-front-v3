import React from 'react'
import styles from './AddAccessoLiberoModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { AddLocationModalProps } from './AddAccessoLiberoModal.interface'
import LanguageSelect from '../../LanguageSelect/LanguageSelect'
function AddAccessoLiberoModal({ isOpen, setIsOpen }: AddLocationModalProps) {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(!isOpen)} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography size={'bodyBig'} weight={'bold'}>
                        {t('Aggiungi Fonte')}
                    </Typography>
                </div>
                <div className={styles.body}>
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t('Fonte')}
                    </Typography>
                    <Input fullWidth={true} />
                </div>
                <div className={styles.body}>
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t('Url')}
                    </Typography>
                    <Input
                        fullWidth={true}
                        placeholder={t('Inserisci url...')}
                    />
                </div>
                <div className={styles.body}>
                    {/*todo: add customautomcompletegoogle*/}
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t('Posizione')}
                    </Typography>
                    <Input fullWidth={true} />
                </div>
                <LanguageSelect borderColor={'#9D96A5'} />
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

export default AddAccessoLiberoModal
