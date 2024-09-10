import React from 'react'
import { SettingsFieldsContainerProps } from './SettingsFieldsContainer.interface'
import styles from './SettingsFieldsContainer.module.scss'
import Typography from '../Typography/Typography'
import TextContainer from '../TextContainer/TextContainer'
import { useTranslation } from 'react-i18next'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import Button from '../Button/Button'
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
                    {isNew ? (
                        <>
                            <Button variant={'outline'} size={'small'}>
                                {t('Annulla')}
                            </Button>
                            <Button variant={'solid'} size={'small'}>
                                {t('Salva')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <SvgWrapper keySvg={'editIcon'} color={'black'} />
                            <SvgWrapper keySvg={'trashIcon'} color={'black'} />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsFieldsContainer
