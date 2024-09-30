type TrackerObj = {
    label: string
    value: number
    total: number
}
export interface TrackerCardProps {
    data: TrackerObj[]
    maxHeight?: boolean
}
