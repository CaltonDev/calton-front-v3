import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'

function BarChartNPS(response: any) {
    return (
        <HorizontalBar
            config={{
                data: response?.data?.data || [],
                xField: 'type',
                yField: 'value',
                seriesField: '',
                legend: true,
                color: () => {
                    return AppConfig.themeColors.primary
                },
            }}
        />
    )
}

export default BarChartNPS
