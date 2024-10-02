import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'

function BarChartSentiment(response: any) {
    return (
        <HorizontalBar
            config={{
                data: response?.data?.data,
                xField: 'type',
                yField: 'value',
                seriesField: '',
                legend: true,
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
                color: (type: string) => {
                    if (type === 'True') {
                        return AppConfig.themeColors.positive
                    } else if (type === 'False') {
                        return AppConfig.themeColors.negative
                    } else {
                        return AppConfig.themeColors.primary
                    }
                },
            }}
        />
    )
}

export default BarChartSentiment
