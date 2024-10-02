import React, { useState } from 'react'
import TopicsChip from '../../TopicsChip/TopicsChip'
import { useTranslation } from 'react-i18next'
import { Column } from '@ant-design/plots'
import AppConfig from '../../../constants/AppConfig'
import { useSelector } from 'react-redux'
import { each, groupBy } from '@antv/util'
import { StackedBarChartProps } from './StackedBarChart.interface'
import { RootState } from '../../../store/store'

const { positive, negative, neutrale } = AppConfig.themeColors

function StackedBarChart({
    chipTopics,
    data,
    showPercentage,
    heading,
}: StackedBarChartProps) {
    const { t } = useTranslation()
    const [showAll, setShowAll] = useState(false)
    const chipTopicsData = chipTopics ? [...chipTopics] : []
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const calculateValues = (dataArray: any[]) => {
        if (dataArray && Array.isArray(dataArray)) {
            const excludedValues = chipTopics
                .filter((item: any) => item.chipFlag === true)
                .map((item: any) => item?.name?.toLowerCase())
            return dataArray?.filter(
                (item) => !excludedValues.includes(item?.xValue?.toLowerCase())
            )
        }
        return []
    }
    const annotations: any[] = []
    each(groupBy(data, 'xValue'), (values, k) => {
        const value = values?.reduce((a: number, b: any) => a + b.value, 0)
        const digitCount =
            Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1 // Count the number of digits in value
        const labelWidth = digitCount * 8 // Assuming each digit occupies approximately 8 pixels

        annotations.push({
            type: 'text',
            position: [k, value],
            content: `${value}`,
            style: {
                fontSize: 14, // Font size of the labels
                fontWeight: 'bolder',
                fill: '#464D69',
            },
            offsetY: -12,
            offsetX: -(labelWidth / 2),
        })
    })

    const config = {
        data: calculateValues(data),
        isStack: true,
        xField: 'xValue',
        yField: 'value',
        seriesField: 'grouped',
        isPercent: showPercentage,
        xAxis: {
            label: {
                autoEllipsis: true,
                autoHide: false,
                formatter: (label: string) => {
                    return label.split(' ').join('\n')
                },
            },
        },
        //legend: false,
        interactions: [
            {
                type: 'active-region',
                enable: false,
            },
        ],
        connectedArea: {
            style: (oldStyle: any) => {
                return {
                    fill: 'rgba(0,0,0,0.25)',
                    stroke: oldStyle.fill,
                    lineWidth: 0.5,
                }
            },
        },
        /*label: showNumbers
            ? {
                  position: 'middle',
                  offsetY: 0,
                  offsetX: 0,
                  layout: !showPercentage
                      ? [{ type: 'limit-in-shape' }]
                      : undefined,
                  style: {
                      fontSize: 12, // Font size of the labels
                      fontWeight: 'bold',
                      fill: '#464D69',
                  },
                  formatter: (value: any) => {
                      if (showPercentage) {
                          return parseFloat(value * 100 + '').toFixed(0) + '%'
                      }
                      return value
                  },
              }
            : undefined,*/
        tooltip: {
            showMarkers: false,
            formatter: (data: any) => {
                return {
                    name:
                        data?.grouped === 'pos'
                            ? t('Positivo')
                            : data?.grouped === 'neg'
                              ? t('Negativo')
                              : t('Neutrale'),
                    value: showPercentage
                        ? parseFloat(data['value'] * 100 + '').toFixed(0) + '%'
                        : data['value'],
                }
            },
            title: (label: string) => {
                return label
            },
        },
        color: (elm: any) => {
            return elm?.grouped === 'pos'
                ? positive
                : elm?.grouped === 'neg'
                  ? negative
                  : neutrale
        },
        annotations: showNumbers ? annotations : undefined,
    }
    //todo: check config props commented
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
            <div id={heading}>
                <Column {...config} />
            </div>
            <TopicsChip chipTopics={chipTopicsData} showAll={showAll} />
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
        </div>
    )
}

export default StackedBarChart
