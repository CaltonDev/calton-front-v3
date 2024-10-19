import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'
import { ColumnConfig } from '@ant-design/plots'

function BarChartGrades(response: any) {
    const config: ColumnConfig = {
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
        color: () => {
            return AppConfig.themeColors.warning
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

export default BarChartGrades
