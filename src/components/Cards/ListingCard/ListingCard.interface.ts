export interface ListingCardProps {
    listing: any
    index: number
    isOnBulkEdit?: boolean
    isSelected?: boolean
    bulkList?: any[]
    setBulkList?: (arg0: any) => void
}
