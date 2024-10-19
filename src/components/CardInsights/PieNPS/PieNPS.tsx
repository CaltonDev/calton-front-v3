import { G2 } from '@ant-design/plots'
import profilePlus from '../../../assets/img/user-plus.svg'
import profileSub from '../../../assets/img/user-delete.svg'
import profileNeu from '../../../assets/img/user-neutral.svg'
import React from 'react'
import ChartConfig from '../../../constants/ChartConfig'
import CustomPie from '../../Charts/CustomPieChart/CustomPieChart'

function PieNPS(response: any) {
    const G = G2.getEngine('canvas')
    const colors = [
        ChartConfig.color.negative,
        ChartConfig.color.neutrale,
        ChartConfig.color.positive,
    ]

    return (
        <CustomPie
            data={response?.data?.data || []}
            colorField={'type'}
            angleField={'value'}
            colors={colors}
            /*label={{
                content: (obj) => {
                    const group = new G.Group({})
                    const currType = obj?.type?.toLowerCase()
                    group?.addShape({
                        type: 'image',
                        attrs: {
                            x:
                                currType === 'detrattori' ||
                                currType === 'neutri'
                                    ? 25
                                    : 0,
                            y: 0,
                            width: 30,
                            height: 30,
                            img:
                                currType === 'promotori'
                                    ? profilePlus
                                    : currType === 'detrattori'
                                      ? profileSub
                                      : profileNeu,
                        },
                    })
                    group?.addShape({
                        type: 'text',
                        attrs: {
                            x:
                                currType === 'detrattori' ||
                                currType === 'neutri'
                                    ? 39
                                    : 14,
                            y: 30,
                            text: obj.type,
                            textAlign: 'center',
                            textBaseline: 'top',
                            fill:
                                currType === 'promotori'
                                    ? ChartConfig.color.positive
                                    : currType === 'neutri'
                                      ? ChartConfig.color.neutrale
                                      : ChartConfig.color.negative,
                        },
                    })
                    return group
                },
            }}*/
        />
    )
}

export default PieNPS
