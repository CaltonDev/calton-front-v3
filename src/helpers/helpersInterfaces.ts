import { ListingServiceBody } from '../services/ListingService'

export interface prefetchNextPageProps {
    queryKey: string
    endpoint: string
    body: ListingServiceBody
    skip: number
    limit: number
    totalNumberOfRecords: number
    staleTime: number
}
