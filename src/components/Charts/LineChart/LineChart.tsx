import TinyAreaChart from '../TinyAreaCharts/TinyAreaChart/TinyAreaChart'
import { hexToRgbA } from '../../../helpers/helpers'
import ChartConfig from '../../../constants/ChartConfig'
import styles from './LineChart.module.scss'
import TinyMultiAreaChart from '../TinyAreaCharts/TinyMultiAreaChart/TinyMultiAreaChart'
import React from 'react'
import ChartHeader from '../ChartHeader/ChartHeader'
import { LineChartProps } from './LineChart.interface'

function LineChart({
    title = '',
    label = '',
    chartdata,
    color,
    numberToShow,
    dataReady,
    extraImg,
    numberToShowComponent,
    decimals,
    styleCounter,
    isSentiment,
    isRound,
    isTwoCols = false,
    fullWidth = false,
    mediaQuery = false,
    isKeyword,
    isInfoTooltip,
    infoTooltip,
    textIcon,
}: LineChartProps) {
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
                <ChartHeader
                    title={title}
                    numberToShow={numberToShow}
                    styleCounter={styleCounter}
                    extraImg={extraImg}
                    dataReady={dataReady}
                    numberToShowComponent={numberToShowComponent}
                    decimals={decimals}
                    isAnt={true}
                    isInfoTooltip={isInfoTooltip}
                    infoTooltip={infoTooltip}
                    textIcon={textIcon}
                />
                {isSentiment ? (
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

export default LineChart
