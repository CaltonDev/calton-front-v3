import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './InfoCard.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import { InfoCardProps } from './InfoCard.interface'

function InfoCard({ value, label, icon }: InfoCardProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                <div className={styles.headerContainer}>
                    <SvgWrapper
                        keySvg={icon}
                        hasContainerProps={{
                            hasContainer: true,
                            containerSize: 60,
                            outlined: false,
                            background: '#EEDFFF',
                        }}
                        customWidth={40}
                        customHeight={40}
                    />
                    <SvgWrapper
                        keySvg={'infoIconSvg'}
                        customWidth={24}
                        customHeight={24}
                    />
                </div>
                <div className={styles.bodyContainer}>
                    <Typography size={'h5'} weight={'bold'}>
                        {label}
                    </Typography>
                    <Typography size={'h2'} weight={'light'}>
                        {value.toString()}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
