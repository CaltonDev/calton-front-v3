import React from 'react'
import styles from './ListingBulkDeleteModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Button from '../../Button/Button'
import { ListingBulkDeleteModalProps } from './ListingBulkDeleteModal.interface'
function ListingBulkDeleteModal({
    isOpen,
    setIsOpen,
    textDelete,
    textBold,
    onConfirm,
    question,
}: ListingBulkDeleteModalProps) {
    const { t } = useTranslation()

    return (
        <>
            {isOpen && (
                <>
                    <div
                        className={styles.darkBG}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <Typography size={'bodyBig'} weight={'bold'}>
                                {t('Attenzione')}
                            </Typography>
                        </div>
                        <div className={styles.body}>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {textDelete ? textDelete : t('Elimina')}
                            </Typography>
                            <Typography size={'bodySmall'} weight={'bold'}>
                                {textBold ? ' ' + textBold : ''}
                            </Typography>
                            <Typography size={'bodySmall'} weight={'light'}>
                                {question ? '?' : ''}
                            </Typography>
                        </div>
                        <div className={styles.footer}>
                            <Button
                                size={'medium'}
                                variant={'outline'}
                                onClick={() => setIsOpen(false)}
                            >
                                {t('Annulla')}
                            </Button>
                            <Button size={'medium'} onClick={onConfirm}>
                                {t('Elimina')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ListingBulkDeleteModal
