import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'
import { useTranslation } from 'react-i18next'

function BarChartPos(response: any) {
    const { t } = useTranslation()

    return (
        <HorizontalBar
            config={{
                data: response?.data?.data,
                xField: 'type',
                yField: 'value',
                seriesField: '',
                legend: true,
                xAxis: {
                    label: {
                        formatter: (label: string) => {
                            if (label === '1') {
                                return t('Positivi')
                            } else if (label === '-1') {
                                return t('Negativo')
                            } else if (label === '0') {
                                return t('Neutrale')
                            }
                        },
                    },
                },
                color: (type: string) => {
                    if (type === '1') {
                        return AppConfig.themeColors.positive
                    } else if (type === '-1') {
                        return AppConfig.themeColors.negative
                    } else if (type === '0') {
                        return AppConfig.themeColors.neutrale
                    }
                },
            }}
        />
    )
}

export default BarChartPos
