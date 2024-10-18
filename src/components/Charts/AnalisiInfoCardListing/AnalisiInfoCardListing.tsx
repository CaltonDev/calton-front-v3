import React from 'react'
import styles from './AnalisiInfoCardListing.module.scss'
import CountUp from 'react-countup'
//import LoaderChart from '../../../../components/CardInsights/LoaderChart/LoaderChart'
//todo: check what is ant badge
import AntBadge from '../../../components/AntBadge/AntBadge'
import { AnalisiInfoCardListingProps } from './AnalisiInfoCardListing.interface'

function AnalisiInfoCardListing({
    label,
    value,
    percentageValue,
    decimals,
    dataReady = false,
    color,
}: AnalisiInfoCardListingProps) {
    return (
        <>
            {dataReady ? (
                <div className={styles.rangeContainer}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div className={styles.coloredPoint}>
                            <AntBadge
                                count={0}
                                size={'default'}
                                color={color}
                            />
                        </div>
                        <div className={styles.valueBody}>
                            <span className={styles.valueTextInner}>
                                <CountUp
                                    separator=","
                                    start={0}
                                    end={value}
                                    duration={3}
                                    decimals={decimals}
                                    useEasing={true}
                                />
                                {' - '}
                                <CountUp
                                    separator=","
                                    start={0}
                                    end={Number(percentageValue)}
                                    duration={3}
                                    decimals={decimals}
                                    useEasing={true}
                                />
                                %
                            </span>
                        </div>
                        <div className={styles.labelBody}>
                            <label className={styles.labelText}>{label}</label>
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
