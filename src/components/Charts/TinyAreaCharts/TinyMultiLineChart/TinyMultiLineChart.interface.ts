export interface TinyMultiLineChartProps {
    data: any[]
    xField?: string
    yField?: string
    seriesField?: string
    colorField?: string
    range?: number[]
    animation?: any
    colorFunction?: number
    smooth?: boolean
    height?: number | string
    hideLegend?: boolean
    title?: string
    chipTopics?: any[]
}
