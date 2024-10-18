import React from 'react'
import { Pie } from '@ant-design/plots'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart';
import { useSelector } from 'react-redux'

const PieChart = ({ title, data, colors, height = '370px' }) => {
    const showNumbers = useSelector((state) => state.Settings.showNumbers)

    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        appendPadding: 10,
        legend: false,
        statistic: {
            title: '',
            content: '',
        },
        color: ({ type }) => {
            let color
            color = colors.find((item) => item?.type === type)?.color
            return color
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
                    /*<LoaderChart type={"circlesUnique"} />*/
                }
            )}
        </>
    )
}

export default PieChart
