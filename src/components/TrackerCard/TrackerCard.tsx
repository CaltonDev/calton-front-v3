import React from 'react'
import styles from './TrackerCard.module.scss'
import Typography from '../Typography/Typography'
import { useTranslation } from 'react-i18next'
import ProgressBar from '../ProgressBar/ProgressBar'
import { TrackerCardProps } from './TrackerCard.interface'
function TrackerCard({ data }: TrackerCardProps) {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            {data?.map((obj) => {
                return (
                    <div className={styles.contentDiv}>
                        <div>
                            <Typography size={'h6'} weight={'light'}>
                                {obj.label}
                            </Typography>
                            <Typography size={'h6'} weight={'bold'}>
                                {obj.value.toString()}
                            </Typography>
                        </div>
                        <div className={styles.progressBar}>
                            <ProgressBar
                                progress={obj.value}
                                progressTotal={obj.total}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TrackerCard
