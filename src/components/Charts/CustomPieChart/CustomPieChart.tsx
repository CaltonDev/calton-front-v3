import React from 'react'
import { Pie } from '@ant-design/plots'
import { CustomPieProps } from './CustomPieChart.interface'

function CustomPie({
    data,
    angleField = '',
    colors,
    appendPadding = 0,
    colorField = '',
    radius = 0.66,
    height = '95%',
}: CustomPieProps) {
    const config = {
        appendPadding: appendPadding,
        data,
        angleField: angleField,
        colorField: colorField,
        radius: radius,
        color: colors,
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }
    return (
        <div style={{ height: height, width: '100%' }}>
            <Pie {...config} />
        </div>
    )
}
export default CustomPie
