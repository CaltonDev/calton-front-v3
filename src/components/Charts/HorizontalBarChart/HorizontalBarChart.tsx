import React from 'react'
import ChartConfig from '../../../constants/ChartConfig'
import test from '../../../assets/img/ratingStar.svg'
import like from '../../../assets/icons/like.svg'
import dislike from '../../../assets/icons/dislike.svg'
import { Bar, BarConfig } from '@ant-design/charts'
import { G2 } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HorizontalBarChartProps } from './HorizontalBarChart.interface'
import { RootState } from '../../../store/store'

function HorizontalBarChart({
    chartdata,
    backgroundColor = '',
    isReccomend,
    title,
}: HorizontalBarChartProps) {
    const G = G2.getEngine('canvas')
    const { t } = useTranslation()
    const isCompact = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const config: BarConfig = {
        data: chartdata,
        xField: isReccomend ? 'occurencies' : 'value',
        yField: 'type',
        color: (elm: any) => {
            return elm?.type === 'positive'
                ? ChartConfig.color.positive
                : elm?.type === 'negative'
                  ? ChartConfig.color.negative
                  : backgroundColor
        },
        animation: undefined,
        yAxis: {
            line: null,
            tickLine: null,
            label: {
                formatter: (label: string) => {
                    return !isCompact ? parseFloat(label).toFixed(0) : label
                },
            },
            grid: {
                line: { style: { lineWidth: 0 } },
            },
        },
        xAxis: {
            grid: {
                line: { style: { lineWidth: 0 } },
            },
        },
        tooltip: {
            showMarkers: false,
            formatter: (data: any) => {
                return {
                    name: t('Recensioni'),
                    value: isReccomend ? data['occurencies'] : data['value'],
                }
            },
        },
        label: {
            content: (obj) => {
                const group = new G.Group({})
                group?.addShape({
                    type: 'image',
                    attrs: {
                        x: 0,
                        y: 1,
                        width: 20,
                        height: 20,
                        img:
                            isReccomend && obj?.type === 'positive'
                                ? like
                                : isReccomend && obj?.type === 'negative'
                                  ? dislike
                                  : test,
                    },
                })
                group?.addShape({
                    type: 'text',
                    attrs: {
                        x: 32,
                        y: 7,
                        text: obj?.value,
                        textAlign: 'center',
                        textBaseline: 'top',
                        fill: '#321D48',
                    },
                })
                return group
            },
            position: 'right', // Set the position of the value labels to the right
            offset: 8, // Adjust the offset of the value labels from the bars
            style: {
                fill: '#000', // Customize the font color of the value labels
            },
        },
        minBarWidth: 10,
        maxBarWidth: 55,
        height: 925,
        padding: [100, 40, 45, 50],
    }
    return (
        <div id={title}>
            <Bar {...config} />
        </div>
    )
}

export default HorizontalBarChart
