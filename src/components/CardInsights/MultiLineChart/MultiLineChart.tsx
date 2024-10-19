import React from 'react'
import TinyMultiLineChart from '../../Charts/TinyAreaCharts/TinyMultiLineChart/TinyMultiLineChart'
import { MultiLineChartProps } from './MultiLineChart.interface'

function MultiLineChart({ response, isYesNo }: MultiLineChartProps) {
    return (
        <div style={{ width: '100%' }}>
            <TinyMultiLineChart
                data={response.data?.data}
                xField={'xValue'}
                yField={'yValue'}
                seriesField={'label'}
                colorField={'label'}
                animation={false}
                colorFunction={isYesNo ? 2 : 0}
                smooth={true}
                height={'98%'}
            />
        </div>
    )
}

export default MultiLineChart
