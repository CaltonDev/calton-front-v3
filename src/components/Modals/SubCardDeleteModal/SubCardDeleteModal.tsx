import React from 'react'
import styles from './SubCardDeleteModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Button from '../../Button/Button'
import { SubCardDeleteModalProps } from './SubCardDeleteModal.interface'
import { createRoot } from 'react-dom/client'

function SubCardDeleteModal({
    isOpen,
    setIsOpen,
    textDelete,
    textBold,
    onConfirm,
    question,
}: SubCardDeleteModalProps) {
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

SubCardDeleteModal.confirm = function ({
    textDelete,
    textBold,
    question,
}: {
    textDelete?: string
    textBold?: number
    question?: boolean
}): Promise<boolean> {
    return new Promise((resolve) => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const root = createRoot(div)

        const closeModal = () => {
            root.unmount()
            document.body.removeChild(div)
        }

        const handleConfirm = () => {
            closeModal()
            resolve(true)
        }

        const handleCancel = () => {
            closeModal()
            resolve(false)
        }

        root.render(
            <SubCardDeleteModal
                isOpen={true}
                setIsOpen={handleCancel}
                textDelete={textDelete}
                textBold={textBold}
                onConfirm={handleConfirm}
                question={question}
            />
        )
    })
}

export default SubCardDeleteModal
