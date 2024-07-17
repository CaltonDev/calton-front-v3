import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './Chat.module.scss'
import Typography from '../Typography/Typography'
import Input from '../Input/Input'
import { useTranslation } from 'react-i18next'
function Chat() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <div>
            <div className={styles.container}>
                <SvgWrapper
                    customWidth={30}
                    customHeight={30}
                    hasContainerProps={{
                        hasContainer: true,
                        containerSize: 55,
                        background: 'black',
                    }}
                    keySvg={'chatIcon.svg'}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                />
            </div>
            {isChatOpen && (
                <div className={styles.chatContainer}>
                    <div className={styles.header}>
                        <div className={styles.svgContainer}>
                            <SvgWrapper
                                keySvg={'caltonLogoSvg'}
                                color={'primaryIcon'}
                                customWidth={35}
                                customHeight={46}
                                hasContainerProps={{
                                    hasContainer: true,
                                    containerSize: 70,
                                    background: '#3F49FC',
                                }}
                            />
                        </div>

                        <Typography size={'h4'} weight={'bold'}>
                            Calton AI
                        </Typography>
                    </div>
                    <div className={styles.footer}>
                        <Input
                            fullWidth={true}
                            size={'large'}
                            placeholder={t('Scrivi...')}
                            suffix={'communicationIcon.svg'}
                        ></Input>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat
