import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import TopicsChip from '../../TopicsChip/TopicsChip'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { LineChartAnalisiProps } from './LineChartAnalisi.interface'

function LineChartAnalisi({
    chipTopics,
    data,
    type,
    title,
}: LineChartAnalisiProps) {
    const { t } = useTranslation()
    const lineChartData = data.dataset
    const [showAll, setShowAll] = useState(false)
    const chipTopicsData = [...chipTopics]
    const labels = [...data.dateXaxis]
    const datAsets = []

    const array = lineChartData,
        indexOf = (arr: any[], q: any) =>
            arr.findIndex(
                (item: any) =>
                    (typeof q === 'string' ? q.toLowerCase() : q.toString()) ===
                    (typeof item.name === 'string'
                        ? item.name.toLowerCase()
                        : item.name.toString())
                //q.toLowerCase() === item.name.toLowerCase()
            )

    for (let i = 0; i < chipTopics.length; i++) {
        const index = indexOf(array, chipTopics[i].name)
        if (chipTopics[i].chipFlag === false && index != -1) {
            const obj = {
                label: lineChartData[index]?.name,
                data: JSON.parse(JSON.stringify(lineChartData[index]?.data)),
                fill: false,
                backgroundColor: chipTopics[i]?.color,
                borderColor: chipTopics[i]?.color,
                tension: 0.5,
            }
            datAsets.push(obj)
        }
    }
    labels.forEach((el, index) => {
        labels[index] = moment(el).format('MMM YYYY')
    })
    const chartData = {
        labels: labels,
        datasets: datAsets,
    }
    const config = {
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
    }
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
            <Line id={title} data={chartData} options={config} />
            <TopicsChip
                chipTopics={chipTopicsData}
                showAll={showAll}
                type={type}
            />
            {chipTopicsData.length > 5 && (
                <div
                    style={{ textAlign: 'right', width: '100%' }}
                    onClick={() => setShowAll(!showAll)}
                >
                    <span
                        style={{
                            alignSelf: 'flex-end',
                            fontSize: '12px',
                            lineHeight: '20px',
                            color: '#3F49FC',
                            fontWeight: '700',
                            cursor: 'pointer',
                        }}
                    >
                        {showAll ? t(`nascondi`) : t(`mostra tutto`)}
                    </span>
                </div>
            )}
        </div>
    )
}

export default LineChartAnalisi
