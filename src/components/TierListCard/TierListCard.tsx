import React, { useState } from 'react'
import SvgWrapper from '../SvgWrapper/SvgWrapper'
import styles from './TierListCard.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import { TierListCardProps } from './TierListCard.interface'
function TierListCard({ tierList, label }: TierListCardProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Typography size={'h5'} weight={'bold'}>
                    {t('Top 3')}
                </Typography>
                <Typography size={'h5'} weight={'light'}>
                    {label}
                </Typography>
            </div>
            <div className={styles.tierListContainer}>
                {tierList?.map((tier, index) => {
                    return (
                        <div key={tier.label} className={styles.contentDiv}>
                            <SvgWrapper
                                customWidth={30}
                                customHeight={30}
                                color={'secondary'}
                                keySvg={tier.icon}
                            />
                            <div
                                className={
                                    index === 0
                                        ? styles.labelContainer
                                        : index === 1
                                          ? styles.labelContainerSecond
                                          : styles.labelContainerThird
                                }
                            >
                                <Typography
                                    size={'bodySmall'}
                                    weight={'normal'}
                                >
                                    {tier.label}
                                </Typography>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TierListCard
