import styles from './CompetitorCard.module.scss'
import * as React from 'react'
import ReactStars from 'react-stars'
import { CompetitorCardProps } from './CompetitorCard.interface'
import Typography from '../../Typography/Typography'
import Checkbox from '../../Checkbox/Checkbox'

function CompetitorCard({
    elm,
    name,
    formatted_address,
    meanRating,
    totRating,
    selected,
    addCompetitor,
}: CompetitorCardProps) {
    return (
        <div key={elm?.place_id} className={styles.containerCard}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    <ReactStars
                        count={5}
                        value={meanRating}
                        size={16}
                        color2={'#FCC207'}
                        color1={'#FFFFFF'}
                        half={false}
                        edit={false}
                    />
                    <Typography size={'bodyXXSmall'} weight={'light'}>
                        {totRating ? totRating?.toString() : ''}
                    </Typography>
                </div>
                <Checkbox />
            </div>
            <div
                onClick={() => addCompetitor(elm)}
                className={
                    selected
                        ? styles.containerButton + ' ' + styles.selectedButton
                        : styles.containerButton
                }
            />
            <div className={styles.bodyText}>
                <Typography size={'bodyMedium'} weight={'bold'}>
                    {name}
                </Typography>
                <Typography size={'bodySmall'} weight={'light'}>
                    {formatted_address ? formatted_address : ''}
                </Typography>
            </div>
        </div>
    )
}
export default CompetitorCard
