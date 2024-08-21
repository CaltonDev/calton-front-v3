import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Area } from '@ant-design/plots'
import { useSelector } from 'react-redux'
import CustomConstants from '../../../../constants/CustomConstants'
import { TinyAreaChartProps } from './TinyAreaChart.interface'
import { RootState } from '../../../../store/store'

function TinyAreaChart({
    label,
    chartdata,
    borderColor,
    title,
    isRound,
}: TinyAreaChartProps) {
    console.log({ label, chartdata })
    const { t } = useTranslation()
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const startColor = '#ffffff'

    const minCalc = () => {
        if (chartdata && chartdata?.length > 0) {
            let min = Math.min(
                ...chartdata?.map((element: any) => {
                    return element['value']
                })
            )
            if (min > 0 || min - 0.2 > 0) {
                min = min - 0.2
            }
            return min
        }
        return 0
    }

    const maxCalc = () => {
        if (chartdata) {
            const max = Math.max(
                ...chartdata?.map((element: any) => {
                    return element['value']
                })
            )
            return Math.round(max * 100) / 100
        }
        return 5
    }

    const config = {
        data: chartdata,
        xField: 'data',
        yField: 'value',
        color: borderColor,
        animation: undefined,
        point: {
            size: 4,
            shape: 'point',
            style: {
                fill: borderColor,
                stroke: '#ffffff',
            },
        },
        state: {
            active: {
                style: {
                    shadowBlur: 0,
                    stroke: '#ffffff',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
        tooltip: {
            showMarkers: false,
            formatter: (data: any) => {
                return { name: label, value: data['value'] }
            },
            title: (label: string) => {
                if (label?.length > 0 && label?.includes('T')) {
                    return moment(label)?.format('DD-MM-yyyy')
                }
                return label
            },
        },
        yAxis: {
            min: minCalc(),
            tickCount: 4,
            label: {
                formatter: (label: string) => {
                    return parseFloat(label).toFixed(isRound ? 0 : 1)
                },
            },
            grid: {
                visible: false,
            },
        },
        padding: label === t('Valutazioni') ? [10, 0, 45, 25] : [10, 0, 45, 40],
        xAxis: {
            visible: false,
            range: [0.02, 0.989],
        },
        label: showNumbers ? CustomConstants.labelAnt : undefined,
        style: {
            fill: `l(270) 0:${startColor} 0.7:${borderColor} 1:${borderColor}`,
        },
    }

    return (
        <>
            {chartdata && chartdata?.length > 0 && (
                <div id={title} style={{ height: '185px', width: '100%' }}>
                    <Area {...config} />
                </div>
            )}
        </>
    )
}

export default TinyAreaChart
