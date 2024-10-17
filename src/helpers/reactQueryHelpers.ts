import { useQueryClient } from 'react-query'
import apiService from '../services/api/apiService'
import { getHeaders } from '../services/api/headers'
import { prefetchNextPageProps } from './helpersInterfaces'

export function prefetchNextPage({
    queryKey,
    endpoint,
    body,
    skip,
    limit,
    totalNumberOfRecords,
    staleTime = 5 * 60 * 1000,
}: prefetchNextPageProps): void {
    if (skip + limit < totalNumberOfRecords) {
        const nextPageIndex = skip / limit + 1
        useQueryClient().prefetchQuery(
            [
                queryKey,
                {
                    ...body,
                    skip: nextPageIndex * limit,
                },
            ],
            () =>
                apiService.apiListings.post(
                    `/${endpoint}`,
                    {
                        ...body,
                        skip: nextPageIndex * limit,
                    },
                    getHeaders()
                ),

            {
                staleTime,
            }
        )
    }
}
