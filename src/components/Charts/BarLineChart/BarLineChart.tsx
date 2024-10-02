import React from 'react'
import { DualAxes } from '@ant-design/plots'
import { BarLineChartProps } from './BarLineChart.interface'

function BarLineChart({
    barData,
    lineData,
    xField,
    yFields,
    seriesField,
    colorBar,
    colorLine,
    xAxis,
}: BarLineChartProps) {
    //todo: check it
    const config = {
        data: [barData, lineData],
        xField: xField,
        yField: yFields,
        xAxis: xAxis,
        geometryOptions: [
            {
                geometry: 'column',
                isStack: true,
                isPercent: false,
                seriesField: seriesField,
                //todo: check this props -> color: colorBar,
            },
            {
                geometry: 'line',
                color: colorLine,
            },
        ],
    }
    return (
        <div style={{ width: '100%' }}>
            <DualAxes {...config} />
        </div>
    )
}

export default BarLineChart
