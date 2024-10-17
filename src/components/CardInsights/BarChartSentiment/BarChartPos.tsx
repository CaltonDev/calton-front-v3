import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'
import { ColumnConfig } from '@ant-design/plots'

function BarChartSentiment(response: any) {
    const config: ColumnConfig = {
        data: response?.response?.data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        xAxis: {
            label: {
                autoRotate: true,
                autoEllipsis: true,
                autoHide: false,
                formatter: (label: string) => {
                    return label.split(' ').join('\n')
                },
            },
        },
        color: (type: any) => {
            if (type === 'True') {
                return AppConfig.themeColors.positive
            } else if (type === 'False') {
                return AppConfig.themeColors.negative
            } else {
                return AppConfig.themeColors.primary
            }
        },
    }
    return (
        <>
            {!response || response?.response?.length === 0 ? null : (
                <HorizontalBar {...config} />
            )}
        </>
    )
}

export default BarChartSentiment
