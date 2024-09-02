export interface BubbleChartProps {
    bubbles: any
    scale: number
    height: number
    width: number
    onBubbleClick: (arg0: string, arg1: string, arg2: string) => void
    onBubbleHover: () => void
    onBubbleFocus: () => void
    type: string
    heading: string
}
