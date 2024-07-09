import CaltonLogoWh from '../../assets/img/Logo Calton Mascotte.png'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

function ErrorSubscriptionModal() {
    const { t, i18n } = useTranslation()

    return <></>
    /*<Modal
            open={open}
            ariaLabelledby="alert-dialog-title"
            ariaDescribedby="alert-dialog-description"
            centered={true}
            footer={[]}
        >
            <span
                id="alert-dialog-title"
                style={{ fontWeight: 'bold', fontSize: 'large' }}
            >
                {t('Attenzione')}
            </span>
            <div style={{ marginBottom: 30, marginTop: 10 }}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <img
                        style={{ marginTop: 15 }}
                        src={CaltonLogoWh}
                        alt="session-logo"
                        width="160"
                    />
                    <br />
                    <b>Il tuo abbonamento è scaduto</b>
                    <br />
                    Contatta il team Sales per continuare ad utilizzare Calton!
                    <br />
                    <br />
                    <Button
                        onClick={() =>
                            (window.location = 'mailto:dario@calton.io')
                        }
                        size={'large'}
                    >
                        Contattaci
                    </Button>
                </div>
            </div>
        </Modal>*/
}

export default ErrorSubscriptionModal
