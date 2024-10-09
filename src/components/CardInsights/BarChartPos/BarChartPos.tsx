import AppConfig from '../../../constants/AppConfig'
import HorizontalBar from '../../Charts/HorizontalBar/HorizontalBarAnt'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnConfig } from '@ant-design/plots'

function BarChartPos(response: any) {
    const { t } = useTranslation()
    const config: ColumnConfig = {
        data: response?.response?.data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
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
        color: (type: any) => {
            if (type === '1') {
                return AppConfig.themeColors.positive
            } else if (type === '-1') {
                return AppConfig.themeColors.negative
            } else {
                return AppConfig.themeColors.neutrale
            }
        },
    }
    return (
        <>
            {!response || response?.response?.length === 0 ? null : (
                <HorizontalBar {...config} />
            )}
        </>
    )
}

export default BarChartPos
