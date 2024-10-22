import { CloseOutlined } from '@ant-design/icons'
import styles from './ConfirmClosedHoursModal.module.scss'
import Button from '../Button/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AntModal from './AntModal'

function ConfirmClosedHoursModal(props: any) {
    const { openModal, setOpenModal, checkedStatus, handleConfirm } = props
    const { t } = useTranslation()
    const handleCloseDeleteInternal = () => {
        setOpenModal(false)
    }

    const handleConfirmModal = () => {
        handleConfirm()
    }

    return (
        <>
            <AntModal
                open={openModal}
                onCancel={() => handleCloseDeleteInternal()}
                ariaLabelledby="alert-dialog-title"
                ariaDescribedby="alert-dialog-description"
                centered={true}
                closeIcon={<CloseOutlined />}
                width={'25%'}
                footer={[]}
            >
                <span
                    id="alert-dialog-title"
                    style={{ fontWeight: 'bold', fontSize: 'large' }}
                >
                    {checkedStatus
                        ? t('Sei sicuro di voler aprire il tuo locale?')
                        : t('Sei sicuro di voler chiudere il tuo locale?')}
                </span>

                <div className={styles.modalBody}>
                    <div id="alert-dialog-description"></div>
                </div>
                <div className={styles.modalFooter}>
                    <div style={{ float: 'right' }}>
                        <span className="cancelButtonColor">
                            <a
                                onClick={() => handleCloseDeleteInternal()}
                                className={`mr-10 ${styles.cancelButton}`}
                            >
                                {t('Annulla')}
                            </a>
                        </span>
                        <Button
                            onClick={handleConfirmModal}
                            className={`text-white pt-8 pb-8 ${styles.btnConfirm}`}
                        >
                            {t('Conferma')}
                        </Button>
                    </div>
                </div>
            </AntModal>
        </>
    )
}

export default ConfirmClosedHoursModal
