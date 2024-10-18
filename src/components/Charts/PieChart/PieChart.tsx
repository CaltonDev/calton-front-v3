import React from 'react'
import { Pie } from '@ant-design/plots'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import { useSelector } from 'react-redux'
import { PieChartProps } from './PieChart.interface'
import { RootState } from '../../../store/store'
import { PieConfig } from '@ant-design/plots/lib'

const PieChart = ({ title, data, colors, height = '370px' }: PieChartProps) => {
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const config: PieConfig = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        appendPadding: 10,
        legend: false,
        color: (obj: any) => {
            return colors.find((item: any) => item?.type === obj?.type)?.color
        },
        label: showNumbers
            ? {
                  type: 'outer',
                  content: '{value}',
                  style: {
                      fontSize: 12, // Font size of the labels
                      fontWeight: 'bold',
                      fill: '#464D69',
                  },
              }
            : undefined,
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }

    return (
        <>
            {data && data?.length > 0 ? (
                <div id={title} style={{ height, width: '100%' }}>
                    <Pie {...config} />
                </div>
            ) : (
                {
                    /*<LoaderChart type={'circlesUnique'} />*/
                }
            )}
        </>
    )
}

export default PieChart
