import React from 'react'
import styles from './TrackerCard.module.scss'
import Typography from '../Typography/Typography'
import ProgressBar from '../ProgressBar/ProgressBar'
import { TrackerCardProps } from './TrackerCard.interface'
function TrackerCard({ data, maxHeight = false }: TrackerCardProps) {
    return (
        <div className={styles.container}>
            {data?.map((obj, idx) => {
                return (
                    <div
                        key={idx}
                        className={
                            maxHeight
                                ? styles.contentDivMaxHeight
                                : styles.contentDiv
                        }
                    >
                        <div className={styles.headerContainer}>
                            <Typography size={'h5'} weight={'bold'}>
                                {obj.label}
                            </Typography>
                            <Typography size={'h2'} weight={'light'}>
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
