import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './TrackerCard.module.scss'
import Typography from '../Typography/Typography'
import Input from '../Input/Input'
import { useTranslation } from 'react-i18next'
import { TrackerCardProps } from './TrackerCard.interface'
import ProgressBar from '../ProgressBar/ProgressBar'
function TrackerCard({ numberOfReply, totalReply }: TrackerCardProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                <div>
                    <Typography size={'h6'} weight={'light'}>
                        {t('Recensioni risposte')}
                    </Typography>
                    <Typography size={'h6'} weight={'bold'}>
                        {numberOfReply.toString()}
                    </Typography>
                </div>
                <div className={styles.progressBar}>
                    <ProgressBar
                        progress={numberOfReply}
                        progressTotal={totalReply}
                    />
                </div>
            </div>
            <div className={styles.contentDiv}>
                <div>
                    <Typography size={'h6'} weight={'light'}>
                        {t('Percentuale di risposta')}
                    </Typography>
                    <Typography size={'h6'} weight={'bold'}>
                        {((numberOfReply * 100) / totalReply).toString()}
                    </Typography>
                </div>
                <div className={styles.progressBar}>
                    <ProgressBar
                        progress={numberOfReply}
                        progressTotal={totalReply}
                    />
                </div>
            </div>
        </div>
    )
}

export default TrackerCard
