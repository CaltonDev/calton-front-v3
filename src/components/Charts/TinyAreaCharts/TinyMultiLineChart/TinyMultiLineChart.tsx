import { Line } from '@ant-design/plots'
import moment from 'moment'
import AppConfig from '../../../../constants/AppConfig'
//import TopicsChip from '..'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomConstants from '../../../../constants/CustomConstants'
import { useSelector } from 'react-redux'
import { TinyMultiLineChartProps } from './TinyMultiLineChart.interface'
import { RootState } from '../../../../store/store'

function TinyMultiLineChart({
    data,
    xField = 'x',
    yField = 'y',
    seriesField = 'label',
    colorField = 'label',
    range = [0, 1],
    animation,
    colorFunction = 1,
    smooth = false,
    height = 400,
    hideLegend = false,
    title,
    chipTopics,
}: TinyMultiLineChartProps) {
    let chipTopicsData = []
    if (chipTopics && chipTopics?.length > 0) {
        chipTopicsData = [...chipTopics]
    }
    const { t } = useTranslation()
    const [showAll, setShowAll] = useState(false)
    const showNumbers = useSelector(
        (state: RootState) => state.Settings.showNumbers
    )

    const minCalc = () => {
        if (data && data?.length > 0) {
            let min = Math.min(
                ...data?.map((element) => {
                    return element[yField]
                })
            )
            if (min > 0 || min - 0.5 > 0) {
                min = min - 0.5
            }
            return min
        }
        return 0
    }

    const calculateValues = (dataArray: any) => {
        if (dataArray && dataArray?.length > 0) {
            const excludedValues = chipTopics
                ?.filter((item) => item.chipFlag === true)
                ?.map((item) => item.name.toLowerCase())
            return dataArray?.filter((item: any) => {
                return !excludedValues?.includes(
                    item[seriesField]?.toLowerCase()
                )
            })
        }
        return []
    }

    const config = {
        data: calculateValues(data),
        xField,
        yField,
        seriesField,
        colorField,
        container: title,
        id: title,
        color:
            colorFunction === 1
                ? (label: string) => {
                      let color
                      data?.forEach((el) => {
                          if (el.label === label) {
                              color = el.color
                          }
                      })
                      return color
                  }
                : colorFunction === 2
                  ? (label: string) => {
                        if (label === 'True') {
                            return AppConfig.themeColors.positive
                        } else {
                            return AppConfig.themeColors.negative
                        }
                    }
                  : colorFunction === 3
                    ? (label: string) => {
                          return AppConfig.themeColors.warning
                      }
                    : colorFunction === 4
                      ? (label: string) => {
                            return chipTopics.find(
                                (item) =>
                                    item.name.toLowerCase() ===
                                    label.toLowerCase()
                            )?.color
                        }
                      : undefined,
        xAxis: {
            range: range,
            nice: true,
            label: {
                formatter: (label: string) => {
                    if (label?.length > 0 && label?.includes('T')) {
                        return moment(label).format('DD-MM-yyyy')
                    }
                    return label
                },
            },
        },
        yAxis: {
            min: minCalc(),
            label: {
                formatter: (lab: string) => {
                    const label = parseFloat(lab)
                    return Number.isInteger(label)
                        ? Math.round(label)
                        : label.toFixed(2)
                },
            },
        },
        legend: hideLegend
            ? false
            : {
                  position: 'bottom',
              },
        brush: {
            enabled: true,
            action: 'highlight',
        },
        label: showNumbers ? CustomConstants.labelAnt : undefined,
        tooltip: {
            formatter: (data: any) => {
                return {
                    name: seriesField ? data[seriesField] : data[xField],
                    value: data[yField],
                }
            },
            title: (label: string) => {
                if (label?.length > 0 && label?.includes('T')) {
                    return moment(label)?.format('DD-MM-yyyy')
                }
                return label
            },
        },
        smooth,
        point: !smooth && {
            shape: 'circle',
        },
        animation: animation
            ? {
                  appear: {
                      animation: 'path-in',
                      duration: 1500,
                  },
              }
            : undefined,
    }

    return (
        <>
            <div id={title} style={{ height }}>
                <Line {...config} />
            </div>
            {hideLegend && (
                <>
                    {/*<TopicsChip chipTopics={chipTopicsData} showAll={showAll} />*/}
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
                </>
            )}
        </>
    )
}

export default TinyMultiLineChart
