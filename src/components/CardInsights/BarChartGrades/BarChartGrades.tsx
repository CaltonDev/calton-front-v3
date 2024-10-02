import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'

function BarChartGrades(response: any) {
    return (
        <HorizontalBar
            config={{
                data: response?.data?.data,
                xAxis: {
                    label: {
                        autoEllipsis: true,
                        autoHide: false,
                        formatter: (label: string) => {
                            return label + ' ⭐'
                        },
                    },
                },
                xField: 'type',
                yField: 'value',
                seriesField: '',
                legend: true,
                color: () => {
                    return AppConfig.themeColors.warning
                },
            }}
        />
    )
}

export default BarChartGrades
