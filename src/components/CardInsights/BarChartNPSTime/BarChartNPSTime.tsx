import AppConfig from '../../../constants/AppConfig'
import moment from 'moment'
import React from 'react'
import BarLineChart from '../../Charts/BarLineChart/BarLineChart'
import ChartConfig from '../../../constants/ChartConfig'

function BarChartNPSTime(response: any) {
    return (
        <BarLineChart
            barData={response?.data?.data?.bar}
            lineData={response?.data?.data?.line}
            xField={'time'}
            yFields={['value', 'nps score']}
            seriesField={'type'}
            colorBar={(type: string) => {
                type = type.toLowerCase()
                if (type === 'promotori') {
                    return AppConfig.themeColors.positive
                } else if (type === 'detrattori') {
                    return AppConfig.themeColors.negative
                } else if (type === 'neutri') {
                    return AppConfig.themeColors.neutrale
                }
            }}
            colorLine={ChartConfig.color.main}
            xAxis={{
                label: {
                    formatter: (label: string) => {
                        return moment(label).format('DD-MM-yyyy')
                    },
                },
            }}
        />
    )
}

export default BarChartNPSTime
