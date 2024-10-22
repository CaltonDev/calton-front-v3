import HeaderGraph from '../../HeaderGraph/HeaderGraph'
import { hexToRgbA } from '../../../helpers/helpers'
import ChartConfig from '../../../constants/ChartConfig'
import styles from './SmallGraphHome.module.scss'
import TinyMultiAreaChart from '../../Charts/TinyAreaCharts/TinyMultiAreaChart/TinyMultiAreaChart'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import React from 'react'
import { SmallGraphHomeProps } from './SmallGraphHome.interface'
import TinyAreaChart from '../../Charts/TinyAreaCharts/TinyAreaChart/TinyAreaChart'

function SmallGraphHome({
    title,
    label,
    chartdata,
    color,
    numberToShow,
    dataReady,
    extraImg,
    numberToShowComponent,
    decimals,
    isSentiment,
    isRound,
    isTwoCols = false,
    fullWidth = false,
    mediaQuery = false,
    isKeyword,
    isInfoTooltip,
    infoTooltip,
}: SmallGraphHomeProps) {
    return (
        <>
            <div
                className={
                    !isTwoCols
                        ? styles.rctBlock
                        : mediaQuery
                          ? styles.rctBlockMediaQuery
                          : styles.rctBlockTwoCols
                }
                style={{ width: fullWidth ? '100%' : isKeyword ? '32%' : '' }}
            >
                <HeaderGraph
                    title={title}
                    numberToShow={numberToShow}
                    extraImg={extraImg}
                    dataReady={dataReady}
                    numberToShowComponent={numberToShowComponent}
                    decimals={decimals}
                    isAnt={true}
                    isInfoTooltip={isInfoTooltip}
                    infoTooltip={infoTooltip}
                />
                {!dataReady ? (
                    <div
                        id={title}
                        style={{
                            height: '165px',
                            width: '100%',
                        }}
                    >
                        {/*<LoaderChart type={'area'} />*/}
                    </div>
                ) : isSentiment ? (
                    <TinyMultiAreaChart title={title} chartdata={chartdata} />
                ) : (
                    <TinyAreaChart
                        isRound={isRound}
                        title={title}
                        label={label}
                        chartdata={chartdata}
                        borderColor={
                            color
                                ? hexToRgbA(color, 3)
                                : hexToRgbA(ChartConfig.color.warning, 3)
                        }
                    />
                )}
            </div>
        </>
    )
}

export default SmallGraphHome
