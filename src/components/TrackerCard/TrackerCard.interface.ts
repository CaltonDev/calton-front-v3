type TrackerObj = {
    label: string
    displayLabel: string
    value: number
    total: number
}
export interface TrackerCardProps {
    data: TrackerObj[]
    maxHeight?: boolean
}
