import React from 'react'
import styles from './ConfirmModal.module.scss'
import { useTranslation } from 'react-i18next'
import Typography from '../../Typography/Typography'
import Button from '../../Button/Button'
import { ConfirmModalProps } from './ConfirmModal.interface'
import { createRoot } from 'react-dom/client'

function ConfirmModal({
    title = 'Attention',
    content,
    onCancel = () => null,
    cancelText = 'Cancel',
    onOk = () => null,
    okText = 'Confirm',
}: ConfirmModalProps) {
    const { t } = useTranslation()

    return (
        <>
            <div className={styles.darkBG} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography size={'bodyBig'} weight={'bold'}>
                        {t(title)}
                    </Typography>
                </div>
                <div className={styles.body}>
                    <Typography size={'bodySmall'} weight={'light'}>
                        {t(content)}
                    </Typography>
                </div>
                <div className={styles.footer}>
                    <Button
                        size={'medium'}
                        variant={'outline'}
                        onClick={onCancel}
                    >
                        {t(cancelText)}
                    </Button>
                    <Button size={'medium'} onClick={onOk}>
                        {t(okText)}
                    </Button>
                </div>
            </div>
        </>
    )
}

ConfirmModal.confirm = function ({
    okText = 'Confirm',
    cancelText = 'Cancel',
    title = 'Atention',
    content,
}: {
    okText?: string
    cancelText?: string
    title?: string
    content: string
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
            <ConfirmModal
                title={title}
                cancelText={cancelText}
                okText={okText}
                content={content}
                onCancel={handleCancel}
                onOk={handleConfirm}
            />
        )
    })
}

export default ConfirmModal
