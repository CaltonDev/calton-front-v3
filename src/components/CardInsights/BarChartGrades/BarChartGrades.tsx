import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'

function BarChartGrades(response: any) {
    console.log(response?.response?.data)
    return (
        <>
            {!response || response?.response?.length === 0 ? null : (
                <HorizontalBar
                    config={{
                        data: response?.response?.data ?? [],
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
            )}
        </>
    )
}

export default BarChartGrades
