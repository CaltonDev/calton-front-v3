import React from 'react'
import AppConfig from '../../../../constants/AppConfig'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Area } from '@ant-design/plots'
import { useSelector } from 'react-redux'
import CustomConstants from '../../../../constants/CustomConstants'
import { RootState } from '../../../../store/store'
import { TinyMultiAreaChartProps } from './TinyMultiAreaChart.interface'

const { positive, negative, neutrale } = AppConfig.themeColors

function TinyMultiAreaChart({ chartdata, title }: TinyMultiAreaChartProps) {
    const { t } = useTranslation()
    const startColor = '#ffffff'
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const config = {
        data: chartdata?.filter((elm) => elm?.type !== 'neu'),
        xField: 'data',
        animation: undefined,
        yField: 'value',
        seriesField: 'type',
        color: (elm: any) => {
            return elm?.type === 'pos'
                ? positive
                : elm?.type === 'neg'
                  ? negative
                  : neutrale
        },
        point: {
            size: 4,
            shape: 'point',
            style: (elm: any) => {
                return {
                    fill: elm?.type === 'pos' ? positive : negative,
                    stroke: '#ffffff',
                }
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
                return {
                    name:
                        data?.type === 'pos'
                            ? t('Positivo')
                            : data?.type === 'neg'
                              ? t('Negativo')
                              : t('Neutrale'),
                    value: data['value'],
                }
            },
            title: (label: string) => {
                if (label?.length > 0 && label?.includes('T')) {
                    return moment(label)?.format('DD-MM-yyyy')
                }
                return label
            },
        },
        legend: false,
        padding: [10, 0, 45, 40],
        yAxis: {
            min: 0,
            grid: {
                visible: false,
            },
            tickCount: 4,
        },
        xAxis: {
            visible: false,
            range: [0.02, 0.989],
        },
        label: showNumbers ? CustomConstants.labelAnt : undefined,
        areaStyle: (elm: any) => {
            return {
                fill:
                    elm.type == 'pos'
                        ? `l(270) 0:${startColor} 0.7:${positive} 1:${positive}`
                        : elm.type == 'neg'
                          ? `l(270) 0:${startColor} 0.7:${negative} 1:${negative}`
                          : `l(270) 0:${startColor} 0.7:${neutrale} 1:${neutrale}`,
            }
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

export default TinyMultiAreaChart
