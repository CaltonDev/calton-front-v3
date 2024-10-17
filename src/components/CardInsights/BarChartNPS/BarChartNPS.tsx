import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'
import { ColumnConfig } from '@ant-design/plots'

function BarChartNPS(response: any) {
    const config: ColumnConfig = {
        data: response?.response?.data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        color: () => {
            return AppConfig.themeColors.primary
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

export default BarChartNPS
