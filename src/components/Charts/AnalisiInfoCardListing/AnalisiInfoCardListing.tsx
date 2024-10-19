import React from 'react'
import styles from './AnalisiInfoCardListing.module.scss'
import CountUp from 'react-countup'
//import LoaderChart from '../../../../components/CardInsights/LoaderChart/LoaderChart'
//todo: check what is ant badge
import AntBadge from '../../../components/AntBadge/AntBadge'
import { AnalisiInfoCardListingProps } from './AnalisiInfoCardListing.interface'
import SvgWrapper from '../../SvgWrapper/SvgWrapper'
import Typography from '../../Typography/Typography'
import { disabledColor } from '../../../constants/constants'

function AnalisiInfoCardListing({
    label,
    value,
    iconSvg = '',
    percentageValue,
    decimals,
    dataReady = false,
    color,
}: AnalisiInfoCardListingProps) {
    return (
        <>
            {dataReady ? (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <SvgWrapper
                            keySvg={iconSvg}
                            size={'medium'}
                            customColor={'#C0BBC5'}
                        />
                        <Typography
                            size={'bodySmall'}
                            weight={'light'}
                            customTextColor={disabledColor}
                        >
                            {label}
                        </Typography>
                    </div>
                    <div className={styles.body}>
                        <AntBadge count={0} size={'default'} color={color} />
                        <div className={styles.bodyText}>
                            <Typography size={'h6'} weight={'normal'}>
                                {value.toString() + ' - '}
                            </Typography>
                            <Typography size={'h6'} weight={'bold'}>
                                {percentageValue + '%'}
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : (
                <>{/*<LoaderChart type="analisiInfoCard" />*/}</>
            )}
        </>
    )
}

export default AnalisiInfoCardListing
