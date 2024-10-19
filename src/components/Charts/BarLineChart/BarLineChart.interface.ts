export interface BarLineChartProps {
    barData: any
    lineData: any
    xField: string
    yFields: string[]
    seriesField: string
    colorBar: (arg0: string) => string | undefined
    colorLine: string
    xAxis: any
}
