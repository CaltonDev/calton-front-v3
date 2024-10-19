import styles from './BubbleChartComparison.module.scss'
import { Scatter, ScatterConfig } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
import React from 'react'
import ChartHeader from '../../ChartHeader/ChartHeader'
import { BubbleChartComparisonProps } from './BubbleChartComparison.interface'

function BubbleChartComparison({
    infoPopover,
    contentPopover,
    title,
    chartdata,
    numberToShow,
    dataReady,
    extraImg,
}: BubbleChartComparisonProps) {
    const { t, i18n } = useTranslation()

    const minCalc = () => {
        let min = Math.min(
            ...chartdata.map((element: any) => {
                return element.x
            })
        )
        if (min > 0 || min - 0.2 > 0) {
            min = min - 0.2
        }
        return min
    }

    const maxCalc = () => {
        let max = Math.max(
            ...chartdata.map((element: any) => {
                return element.y
            })
        )
        if (max < 5 || max + 0.1 < 5) {
            max = max + 0.1
        }
        return max
    }
    const config: ScatterConfig = {
        appendPadding: 30,
        data: chartdata || [],
        xField: 'x',
        yField: 'y',
        sizeField: 'r_real',
        colorField: 'label',
        color: (label: any) => {
            let color = 'red'
            chartdata?.forEach((el: any) => {
                if (el.label === label) {
                    color = el.color
                }
            })
            return color
        },
        size: [20, 50],
        shape: 'circle',
        legend: {
            position: 'bottom',
        },
        brush: {
            enabled: true,
            mask: {
                style: {
                    fill: 'rgba(50,29,72,0.19)',
                },
            },
        },
        xAxis: {
            label: {
                style: {
                    fill: '#321D48',
                },
                formatter: (label: any) => {
                    const labelValue = parseFloat(label) * 100
                    return labelValue.toFixed(0) + '%'
                },
            },
            min: minCalc(),
            grid: {
                line: {
                    style: {
                        stroke: '#321D48',
                        opacity: 0.6,
                    },
                },
            },
            line: {
                style: {
                    stroke: '#321D48',
                    opacity: 0.6,
                },
            },
        },
        yAxis: {
            label: {
                style: {
                    fill: '#321D48',
                },
                formatter: (label: any) => {
                    return parseFloat(label).toFixed(2)
                },
            },
            max: maxCalc(),
            grid: {
                line: {
                    style: {
                        stroke: '#321D48',
                        opacity: 0.6,
                    },
                },
            },
            line: {
                style: {
                    stroke: '#321D48',
                    opacity: 0.6,
                },
            },
        },
        tooltip: {
            customContent: (title: string, data: any) => {
                return (
                    data &&
                    data.length > 0 && (
                        <div className={styles.textTooltip}>
                            <div className={styles.myMargin}>
                                {t('Competitor')}:{' '}
                                <span className={styles.valueTooltip}>
                                    {data[0].data.label}
                                </span>
                            </div>
                            <div className={styles.myMargin}>
                                {t('Sentiment Positivo')}:{' '}
                                <span className={styles.valueTooltip}>
                                    {(data[0].data.x * 100).toFixed(2)}%
                                </span>
                            </div>
                            <div className={styles.myMargin}>
                                {t('Rating medio')}:{' '}
                                <span className={styles.valueTooltip}>
                                    {data[0].data.y}
                                </span>
                            </div>
                            <div className={styles.myMargin}>
                                {t('Frequenza')}:{' '}
                                <span className={styles.valueTooltip}>
                                    {data[0].data.r_real}
                                </span>
                            </div>
                        </div>
                    )
                )
            },
        },
    }

    return (
        <>
            <div className={styles.rctBlock}>
                <ChartHeader
                    title={title}
                    numberToShow={numberToShow}
                    extraImg={extraImg}
                    dataReady={dataReady}
                />
                {!dataReady ? (
                    <div className="row">
                        <div className={`col-sm ${styles.myMargin}`}>
                            {/*<LoaderChart type={'circles'}/>*/}
                        </div>
                    </div>
                ) : (
                    <div id={title} style={{ height: 600 }}>
                        <Scatter {...config} />
                    </div>
                )}
            </div>
        </>
    )
}

export default BubbleChartComparison
