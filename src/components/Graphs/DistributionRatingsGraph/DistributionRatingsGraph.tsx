import React from 'react'
import ChartConfig from '../../../constants/ChartConfig'
//import LoaderChart from 'Components/CardInsights/LoaderChart/LoaderChart'
import { useTranslation } from 'react-i18next'
import HorizontalBarChart from '../../Charts/HorizontalBarChart/HorizontalBarChart'
import { DistributionRatingsGraphProps } from './DistributionRatingsGraph.interface'

function DistributionRatingsGraph({
    backgroundColor,
    chartdata,
    dataReady,
    isReccomend,
}: DistributionRatingsGraphProps) {
    const { t } = useTranslation()

    return (
        <>
            {dataReady ? (
                chartdata && chartdata.length > 0 ? (
                    <div className="sales-chart-wrap">
                        <div className="p-15">
                            <HorizontalBarChart
                                isReccomend={isReccomend}
                                chartdata={chartdata ? chartdata : null}
                                backgroundColor={
                                    backgroundColor
                                        ? backgroundColor
                                        : ChartConfig.color.warning
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: '15%',
                            marginBottom: '15%',
                        }}
                    >
                        {t('Non sono presenti dati')}
                    </div>
                )
            ) : (
                <div style={{ marginTop: 100 }}>
                    {/*<LoaderChart type={'horizontal'} />*/}
                </div>
            )}
        </>
    )
}

export default DistributionRatingsGraph
